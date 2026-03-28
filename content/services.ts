export type MetalTexture = "copper" | "aluminium" | "zinc";

export interface Metal {
  id: string;
  name: string;
  description: string;
  texture: MetalTexture;
}

export const services: Metal[] = [
  {
    id: "physical-trading",
    name: "Physical Trading",
    description:
      "We buy and sell copper, aluminium, and zinc as principal — committing our own capital and taking full commercial responsibility for every tonne. Trading on both spot and term basis, we work directly with smelters, refiners, fabricators, and industrial consumers across European and global markets.",
    texture: "copper",
  },
  {
    id: "price-risk-management",
    name: "Price Risk Management",
    description:
      "Metals prices move. We use LME-based hedging instruments — futures, forwards, and options — to manage price exposure across our positions and, where appropriate, to provide fixed-price structures for our counterparties. Risk management is embedded in how we trade, not an afterthought.",
    texture: "aluminium",
  },
  {
    id: "logistics",
    name: "Logistics",
    description:
      "Physical delivery is where commitments are kept. We coordinate shipping, warehousing, and documentation across the supply chain — handling LME warrant management, insurance, and logistics execution so that metal moves from seller to buyer without friction.",
    texture: "zinc",
  },
];

export const brokerageModel =
  "We act as principal to every transaction — not as agent or broker. Our counterparties deal with a single, known entity that commits its own capital, assumes full commercial risk, and stands behind every tonne it buys and sells. This model has defined our trading relationships for generations and remains the basis on which we seek new ones.";
