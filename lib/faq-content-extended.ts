import type { FaqItem } from "./faq-content";

export const extendedCategoryFaqs: Record<string, FaqItem[]> = {
  investors: [
    {
      q: "Is the Hudson Valley a good area for real estate investment?",
      a: "The Hudson Valley has seen steady demand growth driven by remote work migration, tourism, and limited housing supply. Investment performance varies significantly by town and property type. Local market knowledge is critical for identifying properties with strong fundamentals.",
    },
    {
      q: "What types of investment properties work best in the Hudson Valley?",
      a: "Multi-family properties (2–4 units), short-term vacation rentals near tourist areas, and value-add single-family homes are all active strategies. The right approach depends on your capital, risk tolerance, and whether you want cash flow, appreciation, or both.",
    },
    {
      q: "What are the landlord-tenant laws in New York State?",
      a: "New York has strong tenant protections including limits on security deposits, required notice periods for lease termination, and the Housing Stability and Tenant Protection Act. Consult a real estate attorney before purchasing rental property to understand your obligations.",
    },
    {
      q: "How do I analyze a rental property's potential return?",
      a: "Start with the gross rent multiplier and cap rate for a quick comparison, then build a full cash flow model including mortgage, taxes, insurance, maintenance reserves, vacancy, and management costs. Never rely on the seller's pro forma without verifying the numbers independently.",
    },
    {
      q: "Are short-term rentals allowed in the Hudson Valley?",
      a: "Short-term rental regulations vary by municipality. Some towns like Beacon and Rhinebeck have registration requirements and restrictions. Always verify local zoning and STR ordinances before purchasing a property intended for Airbnb or VRBO use.",
    },
    {
      q: "What is the 1031 exchange and can I use it in New York?",
      a: "A 1031 exchange allows you to defer capital gains taxes by reinvesting sale proceeds into a like-kind property within specific timeframes. New York recognizes federal 1031 exchanges but has its own state-level clawback provisions. Work with a qualified intermediary and tax professional.",
    },
    {
      q: "How do property taxes affect investment returns in Dutchess County?",
      a: "Property taxes in Dutchess County can be substantial and vary widely by municipality and school district. Always factor the actual tax bill into your return calculations — not an estimate. Tax grievance filings may reduce assessments on overvalued investment properties.",
    },
    {
      q: "Should I manage my rental property myself or hire a manager?",
      a: "Self-management saves 8–12% of gross rent but requires time, local presence, and knowledge of landlord-tenant law. Property management makes more sense for out-of-area investors or portfolio owners. Either way, build management costs into your underwriting.",
    },
  ],

  "river-town": [
    {
      q: "What makes Hudson Valley river towns popular with buyers?",
      a: "River towns like Beacon, Cold Spring, and Newburgh offer walkable main streets, Metro-North access, vibrant arts communities, and Hudson River proximity. Each town has distinct character — Beacon skews creative and foodie, Cold Spring is historic and compact, Newburgh is rapidly revitalizing.",
    },
    {
      q: "How is the commute from river towns to New York City?",
      a: "Metro-North's Hudson Line runs through Cold Spring, Beacon, and other river towns. Express trains from Beacon reach Grand Central in about 80 minutes. Many residents combine train commutes with hybrid work schedules of 2–3 days in the city.",
    },
    {
      q: "Are river town properties more expensive than inland areas?",
      a: "Generally yes. Walkability, train access, and cultural amenities command a premium. However, prices vary significantly block by block. Working with an agent who knows the micro-markets within each town helps you find value that online searches miss.",
    },
    {
      q: "What should I know about flooding risk near the Hudson River?",
      a: "Some waterfront and low-lying properties are in FEMA flood zones, which require flood insurance and can affect financing and resale value. Always check flood maps for a specific property and factor insurance costs into your budget before making an offer.",
    },
    {
      q: "Is Newburgh a good investment opportunity?",
      a: "Newburgh offers lower entry prices than neighboring river towns with significant architectural stock and waterfront potential. The city is in an active revitalization phase. As with any emerging market, do thorough due diligence on specific blocks, zoning, and property condition.",
    },
    {
      q: "What is the dining and arts scene like in river towns?",
      a: "Beacon anchors the cultural scene with Dia:Beacon and a thriving Main Street restaurant row. Cold Spring has boutique shops and historic charm. Each river town has distinct offerings ranging from farm-to-table dining to galleries, breweries, and seasonal festivals.",
    },
  ],

  divorce: [
    {
      q: "Do I have to sell my house during a divorce in New York?",
      a: "Not necessarily. Options include one spouse buying out the other, continuing co-ownership temporarily, or selling and splitting proceeds. The right approach depends on equity, mortgage qualification, custody arrangements, and what both parties agree to or a court orders.",
    },
    {
      q: "How is home equity divided in a New York divorce?",
      a: "New York is an equitable distribution state, meaning marital assets are divided fairly but not necessarily 50/50. The court considers factors like each spouse's income, length of marriage, and contributions. An attorney can explain how this applies to your specific situation.",
    },
    {
      q: "Can I sell the house before the divorce is finalized?",
      a: "You may be able to sell during the divorce process if both parties agree or a court grants permission. Having a clear agreement on the listing price, sale proceeds distribution, and timeline prevents delays and additional legal costs.",
    },
    {
      q: "What if one spouse wants to sell and the other does not?",
      a: "If you cannot reach an agreement, the court can order a sale through a partition action. This process adds time and legal expense. Mediation or collaborative divorce approaches often resolve property disputes more efficiently than litigation.",
    },
    {
      q: "How do I protect my interests when selling during divorce?",
      a: "Work with your own attorney and consider a neutral real estate agent both parties trust. Get an independent appraisal or CMA. Document all property-related expenses and keep communication about the sale in writing to avoid future disputes.",
    },
    {
      q: "Will a divorce sale affect my credit?",
      a: "The sale itself does not affect credit, but missed mortgage payments during the process can. If both names are on the mortgage, both credit scores are at risk until the loan is paid off or refinanced. Address the mortgage timeline early in the process.",
    },
  ],

  probate: [
    {
      q: "What is probate and how does it affect selling a property?",
      a: "Probate is the legal process of settling a deceased person's estate. If the property was solely in the deceased's name without a trust or transfer-on-death deed, it typically must go through Surrogate's Court before it can be sold. This process takes 6–12 months in New York.",
    },
    {
      q: "Can I sell a house during the probate process?",
      a: "Yes, but the executor or administrator needs court approval in most cases. Once letters testamentary or letters of administration are issued, the estate's representative has authority to manage and sell property, subject to court oversight.",
    },
    {
      q: "Who pays the expenses on a probate property?",
      a: "The estate is responsible for mortgage payments, taxes, insurance, and maintenance during probate. These costs come from estate funds. If the estate lacks liquid assets, the executor may need to prioritize selling the property to cover obligations.",
    },
    {
      q: "What if there are multiple heirs who disagree about selling?",
      a: "When heirs disagree, mediation is often the most cost-effective path. If resolution is not possible, any heir can petition the court for a partition sale. An experienced probate attorney can guide the process and protect all parties' interests.",
    },
    {
      q: "Do I need to make repairs to a probate property before selling?",
      a: "Not necessarily. Many probate properties sell as-is to investors or buyers looking for value. The decision depends on the property's condition, the estate's available funds, and whether repairs would meaningfully increase the sale price.",
    },
    {
      q: "Are there tax implications when selling an inherited property?",
      a: "Inherited property receives a stepped-up tax basis to the fair market value at the date of death, which can significantly reduce capital gains taxes. Consult a tax professional about your specific situation, including New York State estate tax thresholds.",
    },
  ],

  foreclosure: [
    {
      q: "How does the foreclosure process work in New York?",
      a: "New York is a judicial foreclosure state, meaning the lender must file a lawsuit and obtain a court order. The process typically takes 12–36 months, giving homeowners more time to explore alternatives than in non-judicial states.",
    },
    {
      q: "What is pre-foreclosure and what are my options?",
      a: "Pre-foreclosure is the period between your first missed payment and the foreclosure auction. During this time, you can negotiate with your lender for a loan modification, forbearance, short sale, or deed in lieu of foreclosure. Acting early gives you the most options.",
    },
    {
      q: "Can I sell my house to avoid foreclosure?",
      a: "Yes. If you have equity, a standard sale can pay off the mortgage and stop the foreclosure process. If you owe more than the home is worth, a short sale (with lender approval) may be an option. Both are generally better for your credit than a completed foreclosure.",
    },
    {
      q: "What is a short sale?",
      a: "A short sale occurs when the lender agrees to accept less than the full mortgage balance as settlement. The process requires lender approval, which can take 2–6 months. It impacts your credit less than a foreclosure and may allow you to purchase again sooner.",
    },
    {
      q: "Are there foreclosure prevention resources in New York?",
      a: "New York requires lenders to participate in settlement conferences before foreclosing. Free housing counseling is available through HUD-approved agencies. The New York State Homeowner Protection Program also provides legal assistance to homeowners facing foreclosure.",
    },
    {
      q: "How long does foreclosure stay on my credit report?",
      a: "A foreclosure can remain on your credit report for seven years. The actual impact on your credit score diminishes over time, especially if you rebuild positive credit history. FHA loans may be available again after three years with a documented recovery.",
    },
  ],

  inherited: [
    {
      q: "I inherited a property — what are my options?",
      a: "You can keep it as a primary residence, rent it out for income, sell it immediately, or hold it for potential appreciation. The best choice depends on your financial situation, the property's condition, and your long-term goals.",
    },
    {
      q: "What is a stepped-up basis and how does it help me?",
      a: "When you inherit property, your tax basis is stepped up to the fair market value at the date of the previous owner's death. This means you only pay capital gains taxes on appreciation that occurs after you inherited it, not the entire ownership period.",
    },
    {
      q: "Do I have to pay the existing mortgage on an inherited property?",
      a: "If the property has a mortgage, the estate or heirs are responsible for payments. Federal law (Garn-St. Germain Act) prevents lenders from calling the loan due when property transfers to an heir. You can continue making payments, refinance, or sell to pay it off.",
    },
    {
      q: "What if the inherited property needs significant repairs?",
      a: "Assess repair costs against the property's potential value. Sometimes selling as-is to an investor is the most practical path, especially if the estate lacks funds for renovations. Get estimates before deciding — the gap between as-is and repaired value guides the decision.",
    },
    {
      q: "How do I transfer the title of an inherited property?",
      a: "Title transfer depends on how the property was held. If it passed through a will, probate is typically required. Joint tenancy with right of survivorship and transfer-on-death deeds bypass probate. An attorney can determine the specific steps for your situation.",
    },
    {
      q: "Should I rent out the inherited property instead of selling?",
      a: "Renting can provide ongoing income, but consider the costs of maintenance, management, insurance, and being a landlord. If the property is not in rental condition or you are out of the area, selling may be more practical. Run the numbers before committing.",
    },
  ],

  "tax-lien": [
    {
      q: "What happens when you have a tax lien on your property?",
      a: "A tax lien is placed on your property when property taxes go unpaid. The lien gives the taxing authority a legal claim against your property. In New York, municipalities can eventually sell the lien or foreclose on the property to recover unpaid taxes.",
    },
    {
      q: "Can I sell my house with a tax lien on it?",
      a: "Yes, but the lien must be satisfied at or before closing. The unpaid taxes plus interest and penalties are typically paid from the sale proceeds. Your attorney will coordinate with the tax authority to obtain a payoff amount and ensure clear title at closing.",
    },
    {
      q: "How do I remove a tax lien from my property?",
      a: "Pay the outstanding taxes, penalties, and interest in full. Contact your local tax collector's office for the exact payoff amount. Some municipalities offer payment plans. Once paid, the lien is released and a satisfaction of lien is recorded.",
    },
    {
      q: "What is a tax lien sale?",
      a: "Some New York municipalities sell tax liens to investors at auction. The investor pays your back taxes and earns interest on the amount. If you do not repay the investor within the redemption period, they can initiate foreclosure proceedings to take ownership.",
    },
    {
      q: "How long before unpaid taxes lead to losing my home?",
      a: "The timeline varies by municipality, but New York generally provides a redemption period of at least one year after the tax lien sale. Some jurisdictions allow two years or more. Contact your local tax office early — the sooner you address it, the more options you have.",
    },
  ],

  vacant: [
    {
      q: "Is it harder to sell a vacant property?",
      a: "Vacant properties can be harder to sell because empty rooms look smaller, maintenance issues become more visible, and buyers may worry about the reason it is vacant. Staging, professional photography, and proactive maintenance help overcome these challenges.",
    },
    {
      q: "What risks come with owning a vacant property?",
      a: "Vacant properties face higher risks of vandalism, squatters, pipe freezes, undetected water damage, and insurance complications. Many standard homeowner's policies do not cover extended vacancies — check with your insurer and consider a vacant property policy.",
    },
    {
      q: "Do I need special insurance for a vacant property?",
      a: "Most homeowner's insurance policies limit or exclude coverage after a property has been vacant for 30–60 days. Contact your insurer about a vacant dwelling policy, which covers risks specific to unoccupied properties at a higher premium.",
    },
    {
      q: "Should I winterize a vacant property?",
      a: "Yes. In the Hudson Valley, freeze damage is a major risk. Drain water lines, shut off the main water supply, keep heat above 55 degrees, and have someone check the property regularly. The cost of winterization is a fraction of what a burst pipe repair costs.",
    },
    {
      q: "Can I sell a vacant property as-is?",
      a: "Yes. Many investors and contractors specifically look for vacant properties to purchase as-is. Pricing should reflect the property's current condition. A pre-listing inspection can help you set realistic expectations and avoid surprises during negotiation.",
    },
  ],

  downsizing: [
    {
      q: "When is the right time to downsize?",
      a: "Consider downsizing when maintenance costs exceed your comfort level, most of the house goes unused, or your property taxes and utilities feel disproportionate to your needs. The best time is while you are choosing to move, not when circumstances force it.",
    },
    {
      q: "How do I decide what size home I actually need?",
      a: "Track which rooms you use daily for a month. Most downsizers find they need 1–2 bedrooms, a functional kitchen, one good living space, and storage. Think about how you actually live versus how much space you maintain but rarely use.",
    },
    {
      q: "What are the tax implications of selling a long-held home?",
      a: "If you have lived in your home for at least two of the last five years, you can exclude up to $250,000 (single) or $500,000 (married filing jointly) of capital gains from federal taxes. Gains above these amounts are taxable. Consult a tax professional for your specific situation.",
    },
    {
      q: "Should I sell first or buy first when downsizing?",
      a: "Selling first gives you certainty on proceeds and makes your offer stronger as a buyer. Buying first avoids temporary housing but requires carrying two properties. Bridge loans and rent-back agreements can help manage the transition either way.",
    },
    {
      q: "What are popular downsizing options in the Hudson Valley?",
      a: "Options range from condos and townhouses in planned communities to smaller single-family homes in walkable village centers. Some downsizers move into 55+ communities for lower-maintenance living. The right choice depends on your lifestyle priorities and budget.",
    },
    {
      q: "How do I handle decades of belongings when downsizing?",
      a: "Start early — most people underestimate how long decluttering takes. Sort items into keep, donate, sell, and discard categories. Professional estate sale companies and senior move managers can handle the process efficiently if the task feels overwhelming.",
    },
  ],

  behind: [
    {
      q: "I am behind on my mortgage payments — what should I do first?",
      a: "Contact your lender immediately. Most lenders prefer to work with you on a solution rather than foreclose. Options include forbearance, loan modification, repayment plans, and partial claims. The sooner you communicate, the more options remain available.",
    },
    {
      q: "Will my lender work with me if I cannot make payments?",
      a: "Most lenders have loss mitigation departments specifically for this purpose. They may offer temporary forbearance, a modified payment plan, or a loan modification that reduces your monthly payment. Document your hardship and be prepared to provide financial records.",
    },
    {
      q: "How many missed payments before foreclosure starts in New York?",
      a: "Lenders typically begin the foreclosure process after 3–6 months of missed payments, but New York's judicial foreclosure process adds significant time. You will receive a 90-day pre-foreclosure notice before the lender can file. Use this time to explore your options.",
    },
    {
      q: "What is a loan modification?",
      a: "A loan modification permanently changes your mortgage terms — usually reducing the interest rate, extending the term, or capitalizing missed payments. This can lower your monthly payment to an affordable level. Approval depends on your income and hardship documentation.",
    },
    {
      q: "Can I sell my house if I am behind on payments?",
      a: "Yes. If you have equity, selling pays off the mortgage and stops the delinquency process. If you owe more than the property is worth, a short sale with lender approval may be possible. Either option is typically better for your credit than foreclosure.",
    },
  ],

  "code-violation": [
    {
      q: "Can I sell my house with open code violations?",
      a: "Yes, but code violations must be disclosed and will affect the sale price and buyer pool. Some buyers and investors specifically purchase properties with violations at a discount. Your attorney should address how violations are handled in the contract.",
    },
    {
      q: "What are common code violations that affect home sales?",
      a: "Unpermitted additions, illegal apartments, electrical or plumbing work done without permits, and zoning non-conformities are the most common issues. These can affect financing, insurance, and the buyer's ability to get a mortgage on the property.",
    },
    {
      q: "How do I find out if my property has open code violations?",
      a: "Contact your local building department or code enforcement office. They can provide records of any open violations, permits, and certificates of occupancy on file. Knowing what exists before listing prevents surprises during due diligence.",
    },
    {
      q: "Should I fix code violations before selling?",
      a: "It depends on the cost and nature of the violations. Simple fixes like smoke detector compliance are worth resolving. Major issues like unpermitted additions may be too costly to retroactively permit, making an as-is sale at an adjusted price more practical.",
    },
    {
      q: "Will code violations prevent a buyer from getting a mortgage?",
      a: "Potentially. Lenders and appraisers may flag significant violations, especially those affecting safety or habitability. FHA and VA loans have stricter property condition requirements. Cash buyers and portfolio lenders are more flexible with properties that have open violations.",
    },
  ],

  renters: [
    {
      q: "What is the average rent in the Hudson Valley?",
      a: "Rent varies widely by town, property type, and condition. Studios and one-bedrooms in walkable areas range significantly from inland towns to river communities. Check current listings rather than relying on averages, since the market moves quickly.",
    },
    {
      q: "What are my rights as a tenant in New York State?",
      a: "New York tenants have strong protections including limits on security deposits (one month maximum), required notice before lease termination, protection from retaliatory eviction, and the right to a habitable dwelling. The tenant protection laws were significantly strengthened in 2019.",
    },
    {
      q: "How much should I budget for move-in costs?",
      a: "Expect first month's rent plus one month's security deposit. New York law caps security deposits at one month's rent. Some landlords also charge an application fee. Broker fees, where applicable, are an additional cost — clarify who pays the broker before signing anything.",
    },
    {
      q: "Should I rent or buy in the Hudson Valley?",
      a: "The answer depends on your timeline, financial readiness, and goals. Renting makes sense if you are new to the area and want to explore neighborhoods first, or if your employment or life situation may change soon. Buying makes sense when you have stable income and plan to stay.",
    },
    {
      q: "What should I look for in a Hudson Valley rental?",
      a: "Beyond the unit itself, verify heating type and estimated costs (oil heat is common and expensive), parking availability, internet service options at the address, proximity to Metro-North if you commute, and whether utilities are included in the rent.",
    },
    {
      q: "Can a landlord raise my rent at any time?",
      a: "For non-rent-stabilized units (which is most of the Hudson Valley), landlords can raise rent at lease renewal with proper notice. New York requires written notice 30–90 days in advance depending on tenancy length. Review your lease terms and local regulations for specifics.",
    },
  ],

  market: [
    {
      q: "How is the Hudson Valley real estate market performing?",
      a: "Market conditions shift frequently and vary by town and price range. For the most current data, ask a local agent for recent sales figures in your specific area of interest. Headlines about the national market often do not reflect what is happening locally.",
    },
    {
      q: "Are home prices in the Hudson Valley still rising?",
      a: "Price trends depend on the specific municipality, property type, and price range. Some areas have seen sustained appreciation while others have leveled off. A Comparative Market Analysis for a specific property gives you much more useful information than broad trend data.",
    },
    {
      q: "How does the Hudson Valley market compare to Westchester?",
      a: "The Hudson Valley generally offers more space and lower prices per square foot than Westchester, with a trade-off of longer commutes to NYC. The gap has narrowed in towns with direct Metro-North access like Beacon and Cold Spring.",
    },
    {
      q: "Is there a housing shortage in the Hudson Valley?",
      a: "Inventory has been tight in many Hudson Valley communities, particularly for affordable and mid-range homes. New construction has not kept pace with demand in most towns. Limited supply has contributed to competitive conditions for buyers in desirable areas.",
    },
    {
      q: "What is driving demand in the Hudson Valley?",
      a: "Remote and hybrid work, relative affordability compared to NYC suburbs, quality of life, outdoor recreation access, and growing cultural amenities all contribute to sustained demand. The region's appeal spans multiple buyer demographics.",
    },
    {
      q: "How do interest rates affect the Hudson Valley market?",
      a: "Higher rates reduce buyer purchasing power, which can slow price growth and increase days on market. Lower rates expand the buyer pool and tend to increase competition. The local impact depends on how rate-sensitive the active buyer pool is in a given price range.",
    },
  ],

  ai: [
    {
      q: "How does AI help in real estate?",
      a: "AI assists with automated property valuation analysis, lead routing, market data processing, document preparation, and client communication workflows. It enhances the agent's ability to respond faster and more accurately — it does not replace human judgment on transactions.",
    },
    {
      q: "What is a systems-minded approach to real estate?",
      a: "A systems approach means building repeatable workflows for every stage of the transaction — from lead capture through closing and beyond. This reduces errors, speeds up response times, and ensures consistent service quality regardless of volume.",
    },
    {
      q: "Can AI help me find the right property?",
      a: "AI-powered search tools can filter listings based on nuanced criteria beyond basic parameters. Combined with an agent's local knowledge, these tools surface properties that match your actual priorities rather than just checkbox features.",
    },
    {
      q: "How does automation improve the buying or selling experience?",
      a: "Automated systems handle scheduling, document tracking, status updates, and follow-up communications so nothing falls through the cracks. Clients get faster responses and more consistent updates throughout the transaction without waiting for manual outreach.",
    },
    {
      q: "Is my personal information safe when AI tools are used?",
      a: "Reputable agents and brokerages use AI tools that comply with data privacy standards. Personal and financial information should be handled with the same security protocols as any professional service. Ask your agent about their data handling practices.",
    },
  ],
};

/** Returns extended FAQ items for a given category key, or an empty array if none exist. */
export function getExtendedFaqsForCategory(category: string): FaqItem[] {
  return extendedCategoryFaqs[category] || [];
}
