export interface CompanyConfig {
  established: {
    city: string;
    country: string;
    year: string;
  };
  about: {
    paragraphs: string[];
    pullQuote: string;
  };
  tagline: string;
}

export const company: CompanyConfig = {
  established: {
    city: "Hamburg",
    country: "Germany",
    year: "1873",
  },
  about: {
    paragraphs: [
      "Founded in Hamburg in 1873, SH Metal Commodities built its reputation across more than a century of direct participation in the non-ferrous metals industry — owning and operating smelting assets, trading physical metal, and maintaining long-standing relationships with producers and industrial consumers throughout Europe and beyond.",
      "In the late 2000s, the business underwent a fundamental restructuring. Rising energy costs, intensifying global competition, and the pressures of the economic crisis had rendered domestic smelting operations unviable. Previously held assets in smelting and processing were divested as Germany ceased to be competitive in primary metals production. Rather than exit the industry, Herr Wolf Rudiger Harms — the company's Managing Director — took the decision to continue the business in the form it takes today: a focused, independent trading and brokerage house.",
      "That decision reflected a clear-eyed assessment of where the company's enduring strengths lay — not in fixed assets, but in market knowledge, counterparty relationships, and the ability to source, price, and deliver metal across borders. Today, SH Metal Commodities operates as a lean principal trader, committing its own capital to every transaction and drawing on over 150 years of accumulated expertise in the markets it serves.",
      "Our name is on every trade we make. That obligation — to perform, to honour commitments, and to deal fairly — is the foundation on which every business relationship at SH Metal Commodities rests. It is not a principle we arrived at; it is the only way we have ever worked.",
    ],
    pullQuote: "We trade with our name on every deal.",
  },
  tagline: "Metal. Markets. Trust.",
};
