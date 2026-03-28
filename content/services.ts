export type MetalTexture = "copper" | "aluminium" | "zinc";

export interface Metal {
  id: string;
  name: string;
  grades: string;
  description: string;
  texture: MetalTexture;
}

export interface TradingService {
  id: string;
  name: string;
  description: string;
}

export const metals: Metal[] = [
  {
    id: "copper",
    name: "Copper",
    grades: "Cathode · Rod · Scrap",
    description:
      "The principal conductor of modern infrastructure — present in every electrical cable, motor winding, and heat exchanger. We trade copper on spot and term basis with smelters, wire rod producers, and industrial consumers across European and global markets.",
    texture: "copper",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    grades: "Primary Ingot · Billets · T-Bars",
    description:
      "Indispensable in transport, construction, and packaging for its combination of strength and low weight. Our aluminium trading covers primary ingot, billets, and T-bars, positioned within LME parameters and matched against physical demand from fabricators and end-users in our counterparty network.",
    texture: "aluminium",
  },
  {
    id: "zinc",
    name: "Zinc",
    grades: "SHG Zinc · Zinc Alloys",
    description:
      "The metal that protects steel infrastructure worldwide — through galvanising that extends the working life of bridges, ships, and buildings by decades. We trade SHG zinc and zinc alloys with smelters, galvanisers, and die-casters across European markets.",
    texture: "zinc",
  },
];

export const tradingServices: TradingService[] = [
  {
    id: "price-risk-management",
    name: "Price Risk Management",
    description:
      "Metal prices move continuously, and open price exposure must be actively managed. We use LME futures and forward contracts to hedge our positions and, where appropriate, to provide fixed-price structures for producers or consumers who prefer price certainty over market exposure. Hedging is embedded in how we operate — not an optional add-on.",
  },
  {
    id: "logistics",
    name: "Logistics",
    description:
      "A trade is not complete until metal is delivered. We manage the full logistics chain — coordinating shipping, freight insurance, warehouse receipt and release, LME warrant handling, and customs documentation. Our logistics capability means counterparties can focus on their own operations while we handle the physical movement of metal.",
  },
];

export const principalModel =
  "We act as principal to every transaction — not as agent or broker. Our counterparties deal with a single, known entity that commits its own capital, assumes full commercial risk, and stands behind every tonne it buys and sells. This model has defined our trading relationships for generations and remains the basis on which we seek new ones.";
