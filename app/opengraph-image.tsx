import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt =
  "Gabriel René Rodríguez-Rovira — Digital Strategy & Technology Executive"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
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
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#312424",
          color: "#E0D7D7",
          fontFamily: "Datatype",
        }}
      >
        <div style={{ fontSize: 76, lineHeight: 1.1, display: "flex" }}>
          Gabriel René Rodríguez-Rovira
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 28,
            color: "#B3A0A0",
            display: "flex",
          }}
        >
          Digital Strategy & Technology Executive
        </div>
        <div
          style={{
            fontSize: 21,
            marginTop: 72,
            letterSpacing: 5,
            color: "#9C8787",
            display: "flex",
          }}
        >
          CANNES LIONS · THE ONE SHOW · EL OJO · EFFIE · FIAP
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Datatype",
          data: datatype,
          weight: 400,
          style: "normal",
        },
      ],
    }
  )
}
