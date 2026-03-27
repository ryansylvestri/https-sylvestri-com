import Link from "next/link";

type ContentLockStateProps = {
  title: string;
  description: string;
  nextPath: string;
  locked: "login" | "pro";
};

export function ContentLockState({
  title,
  description,
  nextPath,
  locked,
}: ContentLockStateProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-10 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
          {locked === "login" ? "Login required" : "Pro preview"}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-brand-ink md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-body-ink">
          {description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/login?next=${encodeURIComponent(nextPath)}`}
            className="rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper"
          >
            {locked === "login" ? "Log in for access" : "Join free and view account"}
          </Link>
          <Link
            href="/account"
            className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 px-6 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold"
          >
            Account and access
          </Link>
        </div>
      </div>
    </section>
  );
}
