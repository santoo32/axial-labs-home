import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OG_SIZE } from "@/lib/seo";

export const runtime = "edge";
export const alt = "Axial Labs";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const heading = t("heading");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "80px",
        backgroundColor: "#0A0A0B",
      }}
    >
      {/* Top: brand label */}
      <div
        style={{
          display: "flex",
          fontFamily: "monospace",
          fontSize: 13,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#5A5E68",
        }}
      >
        AXIAL LABS
      </div>

      {/* Center: heading */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 48,
            height: 2,
            backgroundColor: "#C6F24E",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#F4F2EC",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 920,
          }}
        >
          {heading}
        </div>
      </div>

      {/* Bottom: coordinate + tagline */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#5A5E68",
          }}
        >
          ENGINEERED IDENTITY STUDIO
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "#3A3D44",
          }}
        >
          04°N · 73°W
        </div>
      </div>
    </div>,
    size
  );
}
