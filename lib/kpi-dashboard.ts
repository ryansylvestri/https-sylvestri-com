type DashboardStatus = "configured" | "missing";

type DashboardCard = {
  title: string;
  status: DashboardStatus;
  helper: string;
  href?: string;
  actionLabel?: string;
};

type WeeklyCadenceItem = {
  day: string;
  title: string;
  description: string;
};

function hasValue(value?: string) {
  return Boolean(value?.trim());
}

function buildCard(
  title: string,
  configured: boolean,
  helper: string,
  href?: string,
  actionLabel?: string,
): DashboardCard {
  return {
    title,
    status: configured ? "configured" : "missing",
    helper,
    href,
    actionLabel,
  };
}

export function getKpiDashboardCards() {
  const hasSmtp =
    hasValue(process.env.SMTP_HOST) &&
    hasValue(process.env.SMTP_USER) &&
    hasValue(process.env.SMTP_PASS);

  return [
    buildCard(
      "GTM bootstrap",
      hasValue(process.env.NEXT_PUBLIC_GTM_ID),
      "Controls pageview, CTA, and lead event routing from the site layer.",
      process.env.KPI_GTM_CONTAINER_URL,
      "Open GTM",
    ),
    buildCard(
      "GA4 destination",
      hasValue(process.env.NEXT_PUBLIC_GTM_ID) || hasValue(process.env.NEXT_PUBLIC_GA4_ID),
      "Use GTM for the preferred path; GA4 direct remains the fallback path in app code.",
      process.env.KPI_GA4_DASHBOARD_URL,
      "Open GA4",
    ),
    buildCard(
      "Meta Pixel",
      hasValue(process.env.NEXT_PUBLIC_META_PIXEL_ID),
      "Required for PageView and conversion signal parity when Meta is app-injected.",
      process.env.KPI_META_EVENTS_URL,
      "Open Meta",
    ),
    buildCard(
      "Microsoft Clarity",
      hasValue(process.env.NEXT_PUBLIC_CLARITY_ID),
      "Used for heatmaps, rage-click reviews, and friction inspection on lead surfaces.",
      process.env.KPI_CLARITY_DASHBOARD_URL,
      "Open Clarity",
    ),
    buildCard(
      "Lead router",
      hasValue(process.env.LEAD_ROUTER_URL),
      "Primary routing path from `/api/lead` into n8n and downstream automation.",
      process.env.KPI_N8N_DASHBOARD_URL,
      "Open n8n",
    ),
    buildCard(
      "Follow Up Boss fallback",
      hasValue(process.env.FUB_API_TOKEN),
      "Direct fallback path when the router is unavailable or returns an error.",
      process.env.KPI_FUB_DASHBOARD_URL,
      "Open FUB",
    ),
    buildCard(
      "SMTP notifications",
      hasSmtp || process.env.SMTP_JSON_TRANSPORT === "true",
      "Needed for `bot@sylvestri.com` operator notifications and lead visibility.",
      process.env.KPI_MAILBOX_DASHBOARD_URL,
      "Open mailbox",
    ),
    buildCard(
      "Hostinger redeploy path",
      hasValue(process.env.KPI_HOSTINGER_PANEL_URL),
      "Optional hPanel deep link for the remaining environment import and redeploy steps.",
      process.env.KPI_HOSTINGER_PANEL_URL,
      "Open Hostinger",
    ),
  ];
}

export function getWeeklyCadence(): WeeklyCadenceItem[] {
  return [
    {
      day: "Monday",
      title: "Instrumentation review",
      description:
        "Confirm GTM, GA4, Meta Pixel, and Clarity are still firing on homepage, lane pages, and thank-you flows.",
    },
    {
      day: "Wednesday",
      title: "Lead routing review",
      description:
        "Check n8n executions, router retries, Follow Up Boss attribution, and bot mailbox coverage against recent submissions.",
    },
    {
      day: "Friday",
      title: "Conversion review",
      description:
        "Review conversion rates, lead-magnet requests, sequence delivery health, and the next week's highest-leverage fixes.",
    },
  ];
}
