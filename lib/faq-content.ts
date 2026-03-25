export type FaqItem = { q: string; a: string };
export type CategoryFaqs = Record<string, FaqItem[]>;

export const categoryFaqs: CategoryFaqs = {
  buyers: [
    {
      q: "Do I need a real estate attorney to buy a home in New York?",
      a: "Yes. New York is an attorney state, meaning both the buyer and seller are expected to have legal representation during a residential real estate transaction. Your attorney reviews the contract, handles title issues, and represents you at closing.",
    },
    {
      q: "How much do I need for a down payment in the Hudson Valley?",
      a: "Down payment requirements vary by loan type. Conventional loans typically require 5–20%, FHA loans require as little as 3.5%, and VA or USDA loans may require zero down. Your lender will determine what you qualify for based on your financial profile.",
    },
    {
      q: "What are closing costs for buyers in Dutchess County?",
      a: "Buyer closing costs in Dutchess County typically range from 2–5% of the purchase price. These include lender fees, title insurance, attorney fees, recording fees, and prepaid items like property taxes and homeowners insurance.",
    },
    {
      q: "How long does it take to close on a house in New York?",
      a: "A typical residential closing in New York takes 45–90 days from accepted offer to closing. Factors that affect timeline include mortgage approval, attorney review, title search, inspections, and appraisal scheduling.",
    },
    {
      q: "What should I look for during a home inspection?",
      a: "Focus on structural integrity, roof condition, HVAC systems, plumbing, electrical, and signs of water intrusion. A qualified inspector will check all major systems. In the Hudson Valley, also ask about well and septic condition if the property is not on municipal water and sewer.",
    },
    {
      q: "Is it a good time to buy in the Hudson Valley?",
      a: "Market timing depends on your personal circumstances, financing readiness, and local inventory. A buyer's agent can help you assess current conditions in specific towns and neighborhoods so you can make an informed decision based on real data rather than headlines.",
    },
    {
      q: "What towns in the Hudson Valley are popular with buyers?",
      a: "Beacon, Fishkill, Cold Spring, Wappingers Falls, Rhinebeck, and New Paltz are consistently popular. Each town has a different character, commute profile, and price range. The right fit depends on your priorities around schools, commute, walkability, and lifestyle.",
    },
    {
      q: "Can I buy a house with student loan debt?",
      a: "Yes. Lenders look at your debt-to-income ratio, not just total debt. Many buyers with student loans qualify for mortgages. Getting pre-approved early helps you understand exactly where you stand and what price range works for your budget.",
    },
  ],

  sellers: [
    {
      q: "How do I determine the right listing price for my home?",
      a: "Pricing starts with a Comparative Market Analysis (CMA) that examines recent sales of similar properties in your area. Your agent factors in condition, upgrades, location, and current market dynamics to recommend a price that attracts buyers without leaving money on the table.",
    },
    {
      q: "What are seller closing costs in New York?",
      a: "Sellers in New York typically pay 8–10% of the sale price in total costs, including real estate commissions, transfer taxes, attorney fees, and any mortgage payoff. The New York State transfer tax is $2 per $500 of the sale price for residential properties under $3 million.",
    },
    {
      q: "How long does it take to sell a house in the Hudson Valley?",
      a: "Average days on market varies by town, price range, and season. Well-priced homes in desirable areas can sell within weeks, while others may take longer. Your agent should provide realistic timelines based on current local data for your specific market.",
    },
    {
      q: "Should I make repairs before listing my home?",
      a: "Focus on repairs that affect safety, functionality, and first impressions. Fixing obvious issues like leaky faucets, peeling paint, and broken fixtures prevents buyers from negotiating deeper discounts. Major renovations before selling rarely return their full cost.",
    },
    {
      q: "Do I need to stage my home to sell it?",
      a: "Staging helps buyers visualize themselves in the space. At minimum, declutter, depersonalize, and deep clean. Professional staging can increase perceived value, especially in higher price ranges or in homes that show poorly due to layout or furniture choices.",
    },
    {
      q: "What happens if my home doesn't appraise at the contract price?",
      a: "If the appraisal comes in low, the buyer may request a price reduction, bring extra cash to cover the gap, or walk away. Your agent can help negotiate the best path forward, and pricing correctly from the start reduces appraisal risk significantly.",
    },
    {
      q: "Can I sell my house as-is in New York?",
      a: "Yes, you can sell as-is. New York does not require sellers to fill out a property condition disclosure form — instead, sellers typically provide a $500 credit to the buyer in lieu of the disclosure. However, known material defects should still be discussed with your attorney.",
    },
    {
      q: "What is the best time of year to sell in the Hudson Valley?",
      a: "Spring and early summer traditionally see the highest buyer activity and prices. However, less competition in fall and winter can work to a seller's advantage. The best time to sell is when your home is ready and your personal timeline aligns.",
    },
  ],

  "first-time": [
    {
      q: "What programs are available for first-time buyers in New York?",
      a: "New York offers several programs including SONYMA (State of New York Mortgage Agency) low-interest loans, down payment assistance programs, and the federal FHA loan program. Dutchess County also has local assistance programs worth exploring with your lender.",
    },
    {
      q: "How much should I save before buying my first home?",
      a: "Plan for your down payment (3.5–20% depending on loan type), closing costs (2–5% of purchase price), and a reserve fund for moving expenses and initial repairs. Many first-time buyers are surprised by the costs beyond just the down payment.",
    },
    {
      q: "What is pre-approval and why does it matter?",
      a: "Pre-approval is a lender's written commitment to lend you a specific amount based on verified financial information. It tells sellers you are a serious, qualified buyer and gives you clarity on your budget before you start touring homes.",
    },
    {
      q: "What is the difference between pre-qualification and pre-approval?",
      a: "Pre-qualification is an informal estimate based on self-reported information. Pre-approval involves a full credit check, income verification, and underwriter review. Sellers and listing agents take pre-approval letters far more seriously.",
    },
    {
      q: "Should I buy a fixer-upper for my first home?",
      a: "A fixer-upper can build equity faster, but be realistic about renovation costs and timelines. FHA 203(k) loans let you finance both the purchase and repairs in one mortgage. Always get a thorough inspection and contractor estimates before committing.",
    },
    {
      q: "What does a buyer's agent do and do I pay for one?",
      a: "A buyer's agent represents your interests throughout the purchase process — from property search through closing. In most transactions, the commission structure is negotiated as part of the deal. Your agent should explain compensation clearly upfront.",
    },
  ],

  relocation: [
    {
      q: "What is the commute like from the Hudson Valley to NYC?",
      a: "Metro-North runs from towns like Beacon, Cold Spring, and Poughkeepsie into Grand Central. Express trains from Beacon take about 80 minutes. Many Hudson Valley residents commute 2–3 days per week with hybrid work arrangements.",
    },
    {
      q: "How do Hudson Valley property taxes compare to NYC or Westchester?",
      a: "Property taxes in Dutchess and Putnam counties are generally lower than Westchester but higher than many national averages. Rates vary significantly by school district and municipality. Always verify the exact tax amount for a specific property before making an offer.",
    },
    {
      q: "What should I know about well water and septic systems?",
      a: "Many Hudson Valley properties outside village centers use private wells and septic systems instead of municipal water and sewer. Both should be inspected and tested during due diligence. Septic maintenance and well water quality testing are regular homeowner responsibilities.",
    },
    {
      q: "Can I tour homes remotely before relocating?",
      a: "Yes. Video tours, FaceTime walkthroughs, and detailed photo packages are standard practice. Your agent can walk through properties on your behalf and highlight details that photos miss. Many relocation buyers make offers before their first in-person visit.",
    },
    {
      q: "What are the best school districts in Dutchess County?",
      a: "Dutchess County has several well-regarded school districts. District performance varies by specific metrics and priorities. Your agent can provide objective data and resources so you can evaluate which district best fits your family's needs.",
    },
    {
      q: "Is the Hudson Valley a good place for remote workers?",
      a: "The Hudson Valley has become a popular landing spot for remote and hybrid workers. High-speed internet availability varies by location — verify service at specific addresses. Towns like Beacon and Rhinebeck have coworking spaces and strong community infrastructure.",
    },
  ],

  valuation: [
    {
      q: "How is a home's market value determined?",
      a: "Market value is based on what comparable properties have recently sold for in your area, adjusted for differences in condition, size, features, and location. A Comparative Market Analysis (CMA) from a local agent is the best starting point for understanding your home's value.",
    },
    {
      q: "What is the difference between assessed value and market value?",
      a: "Assessed value is the number your local municipality uses for tax calculations and may not reflect current market conditions. Market value is what a buyer would pay in a competitive sale. The two numbers can differ significantly.",
    },
    {
      q: "What improvements add the most value to a home?",
      a: "Kitchen and bathroom updates, fresh paint, new flooring, and improved curb appeal typically offer the strongest returns. Avoid over-improving beyond what your neighborhood supports. The goal is to match or slightly exceed comparable homes, not to exceed the local ceiling.",
    },
    {
      q: "How accurate are online home value estimates?",
      a: "Online estimates use algorithms based on public data and can be off by 10–20% or more, especially in areas with diverse housing stock like the Hudson Valley. They are a starting point, not a substitute for a CMA from a local agent who knows the market.",
    },
    {
      q: "Does my lot size affect my home's value?",
      a: "Yes, but the impact depends on local norms. In the Hudson Valley, lot size matters more in rural areas and less in walkable village centers. Usable acreage, road frontage, and subdivision potential can all influence value beyond just total lot size.",
    },
    {
      q: "Should I get a pre-listing appraisal?",
      a: "A pre-listing appraisal can give you an independent valuation, but it costs $400–600 and the buyer's lender will still require their own appraisal. A thorough CMA from an experienced local agent usually provides the pricing insight you need.",
    },
  ],

  staging: [
    {
      q: "What is the most important room to stage?",
      a: "The living room and kitchen get the most attention from buyers, followed by the primary bedroom. Focus your effort and budget on these spaces first. A clean, well-lit, uncluttered presentation in these rooms has the biggest impact on buyer perception.",
    },
    {
      q: "Can I stage my home myself?",
      a: "Yes. Declutter aggressively, remove personal photos, deep clean everything, and arrange furniture to highlight space and flow. Use neutral colors for bedding and towels. The goal is to let buyers picture their own life in the home.",
    },
    {
      q: "How much does professional staging cost?",
      a: "Professional staging in the Hudson Valley typically runs $1,500–5,000 depending on the size of the home and scope of work. Some stagers offer consultation-only services for a few hundred dollars where they advise you on what to change using your existing furniture.",
    },
    {
      q: "Should I stage a vacant home?",
      a: "Staged vacant homes typically sell faster and for more than empty ones. Empty rooms look smaller, and buyers struggle to gauge scale and layout without furniture. Even partial staging of key rooms can make a significant difference.",
    },
    {
      q: "What should I remove before showing my home?",
      a: "Remove personal photos, religious items, political signage, pet supplies, excessive collections, and anything that narrows the buyer's ability to imagine themselves in the space. Also clear countertops, closets, and storage areas — buyers look everywhere.",
    },
  ],

  closing: [
    {
      q: "What happens at a real estate closing in New York?",
      a: "At closing, both parties' attorneys review and execute documents, the buyer signs mortgage paperwork, funds are transferred, and the deed is recorded. In New York, closings typically happen at the seller's attorney's office or a title company.",
    },
    {
      q: "What is a title search and why is it required?",
      a: "A title search examines public records to confirm the seller has legal ownership and to identify any liens, encumbrances, or claims against the property. Title insurance protects you against defects that the search may have missed.",
    },
    {
      q: "What can delay a closing?",
      a: "Common delays include mortgage underwriting issues, low appraisals, title problems, unresolved inspection repairs, missing documents, and chain-of-title complications. Staying responsive to requests from your attorney and lender helps keep things on track.",
    },
    {
      q: "What is the attorney review period in New York?",
      a: "New York contracts typically include a three-business-day attorney review period after the contract is signed. During this time, either party's attorney can request modifications, negotiate terms, or cancel the contract without penalty.",
    },
    {
      q: "When do I get the keys to my new home?",
      a: "Keys are typically handed over at closing once all documents are signed, funds are transferred, and the deed is recorded. In some cases, the seller may negotiate a post-closing occupancy period, so confirm the key handoff date in your contract.",
    },
    {
      q: "What is the final walkthrough?",
      a: "The final walkthrough happens 24–48 hours before closing. It is your chance to verify the property is in the agreed-upon condition, negotiated repairs are complete, and all included fixtures and appliances are present. Bring your contract and inspection list.",
    },
  ],

  inspection: [
    {
      q: "Do I need a home inspection in New York?",
      a: "While not legally required, a home inspection is strongly recommended. It identifies potential issues with the structure, systems, and safety of the property before you finalize the purchase. Skipping it can lead to costly surprises after closing.",
    },
    {
      q: "What does a home inspection cover?",
      a: "A standard inspection covers the roof, foundation, structure, electrical, plumbing, HVAC, insulation, windows, doors, and visible signs of water damage or pest activity. Specialized inspections for radon, mold, lead paint, or termites are separate and recommended.",
    },
    {
      q: "How much does a home inspection cost in the Hudson Valley?",
      a: "A standard home inspection in the Hudson Valley typically costs $400–700 depending on the size and age of the property. Additional tests like radon, water quality, and septic inspection add $100–300 each. This is money well spent for the protection it provides.",
    },
    {
      q: "Should I attend the home inspection?",
      a: "Yes, whenever possible. Being present lets you ask questions in real time, see issues firsthand, and learn about the home's systems and maintenance needs. Plan to spend 2–4 hours on site depending on the property size.",
    },
    {
      q: "What happens if the inspection reveals problems?",
      a: "You can negotiate repairs or credits with the seller, accept the property as-is, or walk away if the contract allows. Your agent and attorney help you determine which issues are deal-breakers versus normal maintenance items for the age and type of property.",
    },
    {
      q: "Should I get a radon test?",
      a: "Yes, especially in the Hudson Valley where elevated radon levels are common due to the local geology. Radon is a colorless, odorless gas that can cause health issues with prolonged exposure. Mitigation systems are effective and typically cost $800–1,500 to install.",
    },
  ],

  negotiation: [
    {
      q: "How do I make a strong offer on a house?",
      a: "A strong offer includes a competitive price based on comparable sales, a solid pre-approval letter, reasonable contingencies, flexible closing timeline, and proof of funds for the down payment. Your agent can help you craft an offer that stands out without overpaying.",
    },
    {
      q: "Should I offer below asking price?",
      a: "It depends on local market conditions, days on market, and comparable sales. In a competitive market, lowball offers rarely succeed. In a buyer's market or for overpriced listings, offering below asking is a reasonable strategy. Your agent's CMA guides this decision.",
    },
    {
      q: "What are common contingencies in a real estate contract?",
      a: "Standard contingencies include mortgage approval, home inspection, appraisal, and clear title. Some buyers add contingencies for the sale of their current home. Each contingency is a protection for the buyer, but removing them can make your offer more competitive.",
    },
    {
      q: "How do multiple offer situations work?",
      a: "When a seller receives multiple offers, they can accept the best one, counter one or more offers, or ask all buyers for their highest and best. Your agent helps you decide how aggressively to bid based on your budget and how much you want the property.",
    },
    {
      q: "What is an escalation clause?",
      a: "An escalation clause automatically increases your offer by a set amount above any competing bid, up to a maximum you specify. It can help you win in a multiple-offer situation without dramatically overpaying. Not all sellers or listing agents accept them.",
    },
    {
      q: "Can I negotiate after the home inspection?",
      a: "Yes. The inspection period is a standard negotiation point. You can request the seller make repairs, provide a credit at closing, or reduce the price. Focus negotiations on safety issues and major system deficiencies rather than cosmetic items.",
    },
  ],
};

/** Returns FAQ items for a given category key, or an empty array if none exist. */
export function getFaqsForCategory(category: string): FaqItem[] {
  return categoryFaqs[category] || [];
}
