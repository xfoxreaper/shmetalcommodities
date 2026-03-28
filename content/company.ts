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
      "<!-- PLACEHOLDER: Paragraph 1 — company history and founding story -->",
      "<!-- PLACEHOLDER: Paragraph 2 — trading approach and market focus -->",
      "<!-- PLACEHOLDER: Paragraph 3 — values and long-term relationships -->",
    ],
    pullQuote: "<!-- PLACEHOLDER: key brand quote, e.g. 'We trade with our name on every deal.' -->",
  },
  tagline: "Metal. Markets. Trust.",
};
