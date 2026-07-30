"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px", fontFamily: "system-ui", color: "#142033" }}>
          <p style={{ color: "#b65a2a", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Site error</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 54, lineHeight: 1.05 }}>Sylvestri.com could not finish loading.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.7 }}>Try once more. No form submission is sent by retrying this page.</p>
          <button type="button" onClick={reset} style={{ background: "#142033", color: "white", border: 0, padding: "14px 20px", fontWeight: 700 }}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
