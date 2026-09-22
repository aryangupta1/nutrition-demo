import { Inter, Instrument_Serif } from "next/font/google";

/** Body / UI sans. Variable font, so no weight list needed. */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Display serif for headings. Static font: weight 400 only (regular + italic). */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});
