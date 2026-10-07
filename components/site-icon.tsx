import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

/** Monogram icon shared by the favicon and the Apple touch icon. */
export async function siteIcon(px: number) {
  const datatype = await readFile(
    join(process.cwd(), "app/fonts/Datatype-Regular.ttf")
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2B2826",
          color: "#E6E2DD",
          fontFamily: "Datatype",
          fontSize: px * 0.68,
          lineHeight: 1,
          paddingBottom: px * 0.06,
        }}
      >
        G
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Datatype", data: datatype, weight: 400, style: "normal" }],
    }
  )
}
