import { ImageResponse } from "next/og";

export const runtime = "edge";

function clean(value: string | null, fallback: string, maxLength: number) {
  return (value || fallback).replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = clean(url.searchParams.get("title"), "Ryan Sylvestri", 110);
  const category = clean(url.searchParams.get("category"), "Hudson Valley field notes", 45);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf6ef",
          color: "#142033",
          padding: "68px 76px",
          borderTop: "14px solid #b65a2a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: "0.02em" }}>Ryan Sylvestri</div>
          <div style={{ fontSize: 18, color: "#b65a2a", letterSpacing: "0.14em", textTransform: "uppercase" }}>{category}</div>
        </div>
        <div style={{ maxWidth: "1020px", fontSize: title.length > 72 ? 58 : 70, lineHeight: 1.04, letterSpacing: "-0.035em" }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #142033", paddingTop: "22px", fontFamily: "Arial, sans-serif", fontSize: 18 }}>
          <span>Real estate guidance, technology, and ideas</span>
          <span>sylvestri.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
