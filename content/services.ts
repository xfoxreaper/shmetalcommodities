export type MetalTexture = "copper" | "aluminium" | "zinc";

export interface Metal {
  id: string;
  name: string;
  description: string;
  texture: MetalTexture;
}

export const services: Metal[] = [
  {
    id: "copper",
    name: "Copper",
    description:
      "<!-- PLACEHOLDER: 2-3 sentence description of copper trading offering, volumes, grades. -->",
    texture: "copper",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    description:
      "<!-- PLACEHOLDER: 2-3 sentence description of aluminium trading offering, volumes, grades. -->",
    texture: "aluminium",
  },
  {
    id: "zinc",
    name: "Zinc",
    description:
      "<!-- PLACEHOLDER: 2-3 sentence description of zinc trading offering, volumes, grades. -->",
    texture: "zinc",
  },
];

export const brokerageModel =
  "<!-- PLACEHOLDER: 2-3 sentences describing the brokerage model and how SH Metal Commodities adds value as an intermediary. -->";
