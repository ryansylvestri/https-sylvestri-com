'use client';

import { useEffect, useEffectEvent, useState } from 'react';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface FeedColumn {
  title: string;
  feeds: string[];
}

const feedColumns: FeedColumn[] = [
  {
    title: 'Local Home News',
    feeds: [
      'https://patch.com/new-york/fishkill/rss.xml',
      'https://patch.com/new-york/wappingers-falls/rss.xml',
    ],
  },
  {
    title: 'Hudson Valley News',
    feeds: [
      'https://highlandscurrent.org/feed/',
      'https://hudsonvalleyone.com/feed/',
      'https://www.lohud.com/rss/',
    ],
  },
];

function FeedSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-[2rem] bg-slate-100 animate-pulse p-4 space-y-2"
        >
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          <div className="h-3 bg-slate-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

function FeedColumn({ column }: { column: FeedColumn }) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeeds = useEffectEvent(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const feedUrls = column.feeds.join(',');
      const response = await fetch(
        `/api/rss?feeds=${encodeURIComponent(feedUrls)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch feeds');
      }

      const data = await response.json();
      setItems(data.slice(0, 8));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load feeds'
      );
      console.error('RSS Feed Error:', err);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchFeeds();

    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchFeeds, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [column]);

  if (error) {
    return (
      <div className="rounded-[2rem] bg-slate-50 border border-slate-200 p-6 text-center">
        <p className="text-sm text-slate-600">Unable to load {column.title}</p>
      </div>
    );
  }

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="rounded-[2rem] bg-slate-50 border border-slate-200 p-6 text-center">
          <p className="text-sm text-slate-600">No items available</p>
        </div>
      ) : (
        items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-[2rem] bg-white border border-slate-200 p-4 hover:border-slate-400 hover:shadow-md transition-all duration-200"
          >
            <h3 className="font-display text-sm font-semibold text-slate-950 mb-2 line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-600 font-medium uppercase tracking-[0.05em]">
                {item.source}
              </span>
              <time className="text-xs text-slate-500">
                {item.pubDate
                  ? new Date(item.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </time>
            </div>
          </a>
        ))
      )}
    </div>
  );
}

export function RSSFeed() {
  return (
    <div className="py-12 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-semibold text-slate-950 mb-2 tracking-tight">
            Hudson Valley News
          </h2>
          <p className="text-slate-600 text-base">
            Stay updated with local real estate and community news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feedColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-lg font-semibold text-slate-950 mb-4 tracking-tight">
                {column.title}
              </h3>
              <FeedColumn column={column} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
