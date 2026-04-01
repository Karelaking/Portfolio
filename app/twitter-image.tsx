import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = "MK Katiyar portfolio social preview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const TwitterImage = (): ImageResponse => {
  return new ImageResponse(
    <div
      style={{
        background: "#111111",
        color: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "68px",
        gap: "16px",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 20,
          textTransform: "uppercase",
          letterSpacing: 5,
          opacity: 0.8,
        }}
      >
        Developer Portfolio
      </div>
      <div
        style={{
          fontSize: 66,
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: 980,
        }}
      >
        MK Katiyar
      </div>
      <div
        style={{
          fontSize: 30,
          opacity: 0.9,
        }}
      >
        Projects · Experience · Expertise · Writing
      </div>
      <div
        style={{
          fontSize: 20,
          opacity: 0.68,
          maxWidth: 980,
        }}
      >
        {siteConfig.description}
      </div>
    </div>,
    {
      ...size,
    },
  );
};

export default TwitterImage;
