import { NextRequest, NextResponse } from 'next/server';
import { generateHomeownerReport, ReportData } from '@/lib/generate-report';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { ownerName, propertyAddress, leadSource } = body;

    // Validate required fields
    if (!ownerName || !propertyAddress || !leadSource) {
      return NextResponse.json(
        {
          error: 'Missing required fields: ownerName, propertyAddress, leadSource',
        },
        { status: 400 }
      );
    }

    const reportData: ReportData = {
      ownerName: String(ownerName).trim(),
      propertyAddress: String(propertyAddress).trim(),
      leadSource: String(leadSource).trim(),
      submittedAt: new Date().toISOString(),
    };

    // Generate the HTML report
    const htmlReport = await generateHomeownerReport(reportData);

    // Return the HTML report
    return NextResponse.json({
      success: true,
      html: htmlReport,
      data: {
        ownerName: reportData.ownerName,
        propertyAddress: reportData.propertyAddress,
        leadSource: reportData.leadSource,
        generatedAt: reportData.submittedAt,
      },
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return API documentation
  return NextResponse.json({
    message: 'Homeowner Report Generator API',
    endpoint: '/api/report',
    method: 'POST',
    description:
      'Generates a branded HTML homeowner report based on lead data',
    requiredFields: {
      ownerName: 'string',
      propertyAddress: 'string',
      leadSource: 'string (e.g., seller, buyer, investor)',
    },
    example: {
      request: {
        ownerName: 'John Doe',
        propertyAddress: '123 Main St, Fishkill, NY 12524',
        leadSource: 'seller',
      },
      response: {
        success: true,
        html: '<html>...</html>',
        data: {
          ownerName: 'John Doe',
          propertyAddress: '123 Main St, Fishkill, NY 12524',
          leadSource: 'seller',
          generatedAt: '2026-03-16T12:00:00.000Z',
        },
      },
    },
  });
}
