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
      "Founded in Hamburg in 1873, SH Metal Commodities has operated as an independent non-ferrous metal trading house for over a century. From our base in one of Europe's foremost trading cities, we have built enduring relationships with producers, processors, and industrial consumers across the global metals supply chain.",
      "We trade copper, aluminium, and zinc as principal — sourcing, committing capital, and taking responsibility for delivery. Our approach is disciplined: we work within defined risk parameters, trade only markets we understand deeply, and prioritise long-term counterparty relationships over short-term margin.",
      "Our name is on every trade we make. That obligation — to perform, to honour commitments, and to deal fairly — is the foundation on which every business relationship at SH Metal Commodities rests. It is not a principle we arrived at; it is the only way we have ever worked.",
    ],
    pullQuote: "We trade with our name on every deal.",
  },
  tagline: "Metal. Markets. Trust.",
};
