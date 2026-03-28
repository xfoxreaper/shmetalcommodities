import {
  Cormorant_Garamond,
  Lora,
  Josefin_Sans,
  Noto_Serif_SC,
} from "next/font/google";

export const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const bodyFont = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const uiFont = Josefin_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const cjkFont = Noto_Serif_SC({
  variable: "--font-cjk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
