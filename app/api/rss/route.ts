import { NextRequest, NextResponse } from 'next/server';

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

async function fetchAndParseRSS(feedUrl: string): Promise<RSSItem[]> {
  try {
    // Use CORS proxy to handle CORS issues with external feeds
    const corsProxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      feedUrl
    )}`;

    const response = await fetch(corsProxiedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; RSSBot/1.0; +https://sylvestri.com)',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch RSS from ${feedUrl}:`, response.statusText);
      return [];
    }

    const xmlText = await response.text();

    // Parse RSS XML using regex and string manipulation
    // Extract items from RSS feed
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items: RSSItem[] = [];
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];

      const titleMatch = itemContent.match(/<title[^>]*>([\s\S]*?)<\/title>/);
      const linkMatch = itemContent.match(/<link[^>]*>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/);

      const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
      const link = linkMatch ? linkMatch[1].trim() : feedUrl;
      const pubDate = pubDateMatch
        ? pubDateMatch[1].trim()
        : new Date().toISOString();

      // Extract source from feed URL
      const sourceUrl = new URL(feedUrl);
      const hostname = sourceUrl.hostname.replace('www.', '').split('.')[0];
      const source = hostname.charAt(0).toUpperCase() + hostname.slice(1);

      items.push({
        title,
        link,
        pubDate,
        source,
      });

      if (items.length >= 10) break;
    }

    return items;
  } catch (error) {
    console.error(`Error parsing RSS from ${feedUrl}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const feedsParam = searchParams.get('feeds');

    if (!feedsParam) {
      return NextResponse.json(
        { error: 'Missing feeds parameter' },
        { status: 400 }
      );
    }

    const feedUrls = feedsParam.split(',').map((url) => url.trim());

    // Fetch all feeds in parallel
    const allItemsPromises = feedUrls.map((url) => fetchAndParseRSS(url));
    const allItemsArrays = await Promise.allSettled(allItemsPromises);

    // Flatten and combine results
    const allItems: RSSItem[] = [];
    allItemsArrays.forEach((result) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
      }
    });

    // Sort by date (newest first)
    allItems.sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    // Return with cache headers (15 minutes)
    const response = NextResponse.json(allItems);
    response.headers.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');

    return response;
  } catch (error) {
    console.error('RSS API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    );
  }
}
