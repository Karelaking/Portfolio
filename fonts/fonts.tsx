import { Caveat, Major_Mono_Display, Monoton, Montserrat } from "next/font/google";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
});

const major_mono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export {
  caveat,
  monoton,
  major_mono,
  montserrat,
}