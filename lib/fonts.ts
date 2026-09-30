import localFont from "next/font/local"

export const datatype = localFont({
  src: [
    { path: "../app/fonts/Datatype-Variable.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-datatype",
  display: "swap",
})

export const neueYork = localFont({
  src: [
    { path: "../app/fonts/PPNeueYork-NormalLight.otf", weight: "300", style: "normal" },
    { path: "../app/fonts/PPNeueYork-NormalLightItalic.otf", weight: "300", style: "italic" },
  ],
  variable: "--font-neue-york",
  display: "swap",
})
