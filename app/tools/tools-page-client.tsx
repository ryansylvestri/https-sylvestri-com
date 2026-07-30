"use client";

import { useMemo, useState } from "react";

import { SiteShell } from "@/components/site-shell";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function ToolsPageClient() {
  const [homePrice, setHomePrice] = useState(550000);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [income, setIncome] = useState(180000);
  const [debts, setDebts] = useState(1500);
  const [salePrice, setSalePrice] = useState(650000);
  const [mortgageBalance, setMortgageBalance] = useState(320000);

  const mortgagePayment = useMemo(() => {
    const principal = homePrice * (1 - downPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const totalPayments = termYears * 12;
    if (monthlyRate <= 0) return principal / totalPayments;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    );
  }, [downPercent, homePrice, rate, termYears]);

  const affordabilityCap = useMemo(() => {
    const monthlyIncome = income / 12;
    const maxHousing = monthlyIncome * 0.36 - debts;
    return Math.max(maxHousing, 0);
  }, [debts, income]);

  const estimatedNet = useMemo(() => {
    const closingCostRate = 0.09;
    return salePrice - mortgageBalance - salePrice * closingCostRate;
  }, [mortgageBalance, salePrice]);

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">Tools</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-brand-ink md:text-6xl">
          Mortgage, affordability, and net-proceeds calculators
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-body-ink">
          Change the assumptions to explore a scenario. These estimates are educational only and
          do not include every tax, fee, insurance cost, loan term, or property-specific expense.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-3">
        <article className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6">
          <h2 className="font-display text-3xl text-brand-ink">Mortgage</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Home price
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Down payment %
              <input
                type="number"
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Interest rate %
              <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Term (years)
              <input
                type="number"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
          </div>
          <p className="mt-6 text-sm text-body-ink">
            Estimated monthly principal + interest:{" "}
            <strong className="text-brand-ink">{currency(mortgagePayment)}</strong>
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-ink">
            Formula: fixed-rate principal and interest using the entered price, down payment,
            annual interest rate, and term. Taxes, insurance, mortgage insurance, and fees are excluded.
          </p>
        </article>

        <article className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6">
          <h2 className="font-display text-3xl text-brand-ink">Affordability</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Annual income
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Monthly debts
              <input
                type="number"
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
          </div>
          <p className="mt-6 text-sm text-body-ink">
            Estimated max monthly housing payment:{" "}
            <strong className="text-brand-ink">{currency(affordabilityCap)}</strong>
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-ink">
            Assumption: total monthly debt plus housing is limited to 36% of gross monthly income.
            A lender may use different inputs and limits.
          </p>
        </article>

        <article className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6">
          <h2 className="font-display text-3xl text-brand-ink">Net Proceeds</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Estimated sale price
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Mortgage payoff
              <input
                type="number"
                value={mortgageBalance}
                onChange={(e) => setMortgageBalance(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[rgba(15,23,42,0.12)] px-3 py-2"
              />
            </label>
          </div>
          <p className="mt-6 text-sm text-body-ink">
            Estimated proceeds after 9% selling costs:{" "}
            <strong className="text-brand-ink">{currency(estimatedNet)}</strong>
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-ink">
            Assumption: selling costs equal 9% of the entered sale price. Actual commissions,
            transfer taxes, legal fees, credits, repairs, and payoff amounts vary.
          </p>
        </article>
      </section>
      <section className="border-t border-[rgba(20,32,51,0.18)] bg-[#f4ede3] py-10">
        <div className="site-container text-sm leading-7 text-body-ink">
          <strong className="text-brand-ink">Use these outputs as a starting point, not a quote.</strong>{" "}
          Verify financing with a qualified lender and sale proceeds with the appropriate real
          estate, legal, tax, and financial professionals.
        </div>
      </section>
    </SiteShell>
  );
}
