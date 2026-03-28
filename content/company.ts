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
      "SH Metal Commodities was established in Hamburg in 1873. For more than a century, the firm operated at every level of the non-ferrous metals trade — owning smelting assets, processing raw material, buying and selling physical metal. Relationships with producers, consumers, and intermediaries across Europe were built over decades and, in many cases, over generations.",
      "By the late 2000s, the economics of German smelting had changed irreversibly. Energy costs rose. Globalisation shifted production to lower-cost jurisdictions. The financial crisis accelerated what was already underway. The company's smelting and processing assets were sold. Many firms in a similar position would have closed the book. Herr Wolf Rudiger Harms, Managing Director, chose a different path: to continue the business as what it had always been at its core — a trading house.",
      "That decision stripped the company back to its essential strengths. Not fixed assets or production capacity, but something harder to replicate: deep knowledge of non-ferrous markets, trusted counterparty relationships built over 150 years, and the commercial judgement to source, price, and move metal across borders. Today, SH Metal Commodities trades copper, aluminium, and zinc as principal — committing its own capital, carrying its own risk.",
      "We have no interest in being the largest firm in our market. We intend to remain among the most reliable. Every commitment we make is backed by our capital and our name. In this business, that is the only currency that compounds.",
    ],
    pullQuote: "The assets changed. The knowledge didn't.",
  },
  tagline: "Metal. Markets. Trust.",
};
