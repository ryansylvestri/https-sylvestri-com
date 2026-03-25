export interface ReportData {
  ownerName: string;
  propertyAddress: string;
  leadSource: string;
  submittedAt: string;
}

export async function generateHomeownerReport(
  data: ReportData
): Promise<string> {
  const { ownerName, propertyAddress, leadSource, submittedAt } = data;

  const formattedDate = new Date(submittedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const nextSteps = getNextStepsByLeadSource(leadSource);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homeowner Report - Ryan Sylvestri</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      color: #1f2937;
      line-height: 1.6;
      background: #f9fafb;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #0054A4 0%, #00417f 100%);
      color: white;
      padding: 48px 40px;
      text-align: center;
      border-bottom: 4px solid #ED1C24;
    }
    
    .header-logo {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    
    .header-subtitle {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      opacity: 0.95;
    }
    
    .content {
      padding: 40px;
    }
    
    .greeting {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .greeting h1 {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 12px;
    }
    
    .greeting p {
      font-size: 15px;
      color: #6b7280;
      line-height: 1.7;
    }
    
    .property-section {
      background: #f3f4f6;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
      border-left: 4px solid #0054A4;
    }
    
    .property-section h2 {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #6b7280;
      margin-bottom: 12px;
    }
    
    .property-address {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }
    
    .section {
      margin-bottom: 32px;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #0054A4;
    }
    
    .market-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .market-item {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
    
    .market-item-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
      margin-bottom: 8px;
    }
    
    .market-item-value {
      font-size: 20px;
      font-weight: 700;
      color: #0054A4;
    }
    
    .next-steps {
      background: #f0f9ff;
      border: 1px solid #bfdbfe;
      border-left: 4px solid #0054A4;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 32px;
    }
    
    .next-steps-list {
      list-style: none;
    }
    
    .next-steps-item {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #bfdbfe;
    }
    
    .next-steps-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    .next-steps-number {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      background: #0054A4;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
    
    .next-steps-content {
      flex: 1;
    }
    
    .next-steps-content-title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 4px;
      font-size: 14px;
    }
    
    .next-steps-content-desc {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.5;
    }
    
    .disclaimer {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 32px;
      font-size: 12px;
      color: #92400e;
      line-height: 1.6;
    }
    
    .footer {
      background: #1f2937;
      color: white;
      padding: 40px;
      text-align: center;
      font-size: 13px;
    }
    
    .footer-contact {
      margin-bottom: 16px;
      line-height: 1.8;
    }
    
    .footer-contact-item {
      margin-bottom: 8px;
    }
    
    .footer-contact-label {
      font-weight: 600;
      color: #f3f4f6;
    }
    
    .footer-contact-value {
      color: #d1d5db;
    }
    
    .footer-divider {
      height: 1px;
      background: #4b5563;
      margin: 20px 0;
    }
    
    .footer-url {
      color: #60a5fa;
      font-weight: 500;
    }
    
    .footer-timestamp {
      margin-top: 16px;
      font-size: 11px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-logo">Ryan Sylvestri</div>
      <div class="header-subtitle">
        Ryan Sylvestri | Associate Broker | RE/MAX Town & Country
      </div>
    </div>
    
    <!-- Content -->
    <div class="content">
      <!-- Greeting -->
      <div class="greeting">
        <h1>Hello, ${escapeHtml(ownerName)}!</h1>
        <p>
          Thank you for reaching out. Ryan Sylvestri is ready to help you navigate the
          Hudson Valley real estate market. This report provides an overview of your property and
          next steps.
        </p>
      </div>
      
      <!-- Property Section -->
      <div class="property-section">
        <h2>Your Property</h2>
        <div class="property-address">${escapeHtml(propertyAddress)}</div>
      </div>
      
      <!-- Market Snapshot -->
      <div class="section">
        <h2 class="section-title">Market Snapshot</h2>
        <div class="market-grid">
          <div class="market-item">
            <div class="market-item-label">Estimated Value Range</div>
            <div class="market-item-value">TBD</div>
          </div>
          <div class="market-item">
            <div class="market-item-label">Avg Days on Market</div>
            <div class="market-item-value">TBD</div>
          </div>
          <div class="market-item">
            <div class="market-item-label">Recent Comps</div>
            <div class="market-item-value">TBD</div>
          </div>
        </div>
        <p style="font-size: 13px; color: #6b7280; font-style: italic;">
          A detailed market analysis based on your property will follow via email.
        </p>
      </div>
      
      <!-- Next Steps -->
      <div class="next-steps">
        <h2 style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 16px;">Your Next Steps</h2>
        <ul class="next-steps-list">
          ${nextSteps.map((step, idx) => `
            <li class="next-steps-item">
              <div class="next-steps-number">${idx + 1}</div>
              <div class="next-steps-content">
                <div class="next-steps-content-title">${escapeHtml(step.title)}</div>
                <div class="next-steps-content-desc">${escapeHtml(step.description)}</div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
      
      <!-- Disclaimer -->
      <div class="disclaimer">
        <strong>Important:</strong> This report was generated automatically based on your inquiry.
        A personalized analysis and market assessment from Ryan will
        follow shortly.
        This is not a formal appraisal or valuation.
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-contact">
        <div class="footer-contact-item">
          <span class="footer-contact-label">Ryan Sylvestri</span><br>
          <span class="footer-contact-value">Ryan Sylvestri, Associate Broker, RE/MAX Town & Country</span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-value">584 Route 9, Fishkill, NY 12524</span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-value">📞 (845) 867-2646 | 📧 ryan@sylvestri.com</span>
        </div>
      </div>
      <div class="footer-divider"></div>
      <p>
        Learn more: <span class="footer-url">sylvestri.com</span>
      </p>
      <div class="footer-timestamp">
        Generated on ${escapeHtml(formattedDate)}
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return html;
}

interface NextStep {
  title: string;
  description: string;
}

function getNextStepsByLeadSource(leadSource: string): NextStep[] {
  const source = leadSource.toLowerCase();

  // Seller-focused leads
  if (
    source.includes('sell') ||
    source.includes('seller') ||
    source.includes('list')
  ) {
    return [
      {
        title: 'Schedule a Home Value Consultation',
        description:
          "We'll discuss your home, goals, and the current Hudson Valley market to determine a competitive price.",
      },
      {
        title: 'Create Your Marketing Plan',
        description:
          "Together we'll develop a targeted strategy to showcase your home to qualified buyers.",
      },
      {
        title: 'Prepare for Market Launch',
        description:
          'Professional photography, staging recommendations, and listing optimization to maximize your results.',
      },
    ];
  }

  // Buyer-focused leads
  if (
    source.includes('buy') ||
    source.includes('buyer') ||
    source.includes('search')
  ) {
    return [
      {
        title: 'Pre-Approval & Budget Review',
        description:
          "Let's confirm your financing and establish your target price range in the Hudson Valley market.",
      },
      {
        title: 'Property Search & Showings',
        description:
          "I'll identify homes matching your criteria and schedule private tours at your convenience.",
      },
      {
        title: 'Offer Strategy & Negotiation',
        description:
          "When you find the right property, we'll build a competitive offer and manage the entire negotiation process.",
      },
    ];
  }

  // Investor-focused leads
  if (source.includes('invest') || source.includes('investor')) {
    return [
      {
        title: 'Investment Property Analysis',
        description:
          "We'll evaluate cash flow, cap rates, and long-term appreciation potential for your specific goals.",
      },
      {
        title: 'Market Opportunity Briefing',
        description:
          "I'll share current Hudson Valley investment trends, emerging neighborhoods, and deal pipeline.",
      },
      {
        title: 'Portfolio Strategy Session',
        description:
          "Let's align on your investment criteria and create a targeted acquisition strategy.",
      },
    ];
  }

  // Default generic next steps
  return [
    {
      title: 'Initial Consultation Call',
      description:
        "We'll discuss your real estate goals and how I can best help you in the Hudson Valley market.",
    },
    {
      title: 'Property & Market Review',
      description:
        "I'll provide detailed insights into your specific situation and current market conditions.",
    },
    {
      title: 'Action Plan Development',
      description:
        "Together we'll create a customized plan to achieve your real estate objectives.",
    },
  ];
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
