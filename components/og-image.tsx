import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { Locale } from "@/lib/i18n"
import { JOB_TITLE, SITE_NAME } from "@/lib/site-metadata"

export const OG_SIZE = { width: 1200, height: 630 }

const AWARDS = "Cannes Lions · The One Show · El Ojo · Effie · FIAP"

/** Shared share-image renderer for the English and Spanish routes. */
export async function ogImage(locale: Locale) {
  const [datatype, photo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Datatype-Regular.ttf")),
    readFile(join(process.cwd(), "public/speaking/gabo-el-salvador.jpg")),
  ])
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#2B2826",
          color: "#E6E2DD",
          fontFamily: "Datatype",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 64px 64px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 58, lineHeight: 1.1, display: "flex" }}>
              {SITE_NAME}
            </div>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.3,
                marginTop: 24,
                color: "#B5AEA6",
                display: "flex",
              }}
            >
              {JOB_TITLE[locale]}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              color: "#9A938B",
            }}
          >
            <div style={{ display: "flex" }}>{AWARDS}</div>
            <div style={{ display: "flex" }}>gaborene.com</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={480}
          height={630}
          style={{ width: 480, height: 630, objectFit: "cover", objectPosition: "60% 50%" }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Datatype", data: datatype, weight: 400, style: "normal" }],
    }
  )
}
