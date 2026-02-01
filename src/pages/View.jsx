import { useSearchParams } from "react-router-dom";
import { flowers } from "../data/flowers";

export default function View() {
  const [params] = useSearchParams();

  const flowerIds = params.get("f")?.split(",") || [];
  const message = decodeURIComponent(params.get("m") || "");

  const flowerSlots = [
    { x: -80, y: -40, r: -10 },
    { x: 0, y: -60, r: 5 },
    { x: 80, y: -40, r: 12 },
    { x: -120, y: 40, r: -5 },
    { x: -40, y: 30, r: 8 },
    { x: 40, y: 30, r: -8 },
    { x: 120, y: 40, r: 6 },
    { x: -60, y: 100, r: -12 },
    { x: 20, y: 110, r: 5 },
    { x: 90, y: 100, r: -3 }
  ];

  // 🔥 STRING MATCH — THIS IS THE FIX
  const selectedFlowers = flowerIds
    .map(id => flowers.find(f => f.id === id))
    .filter(Boolean);

  return (
    <div style={{ padding: 24, textAlign: "center", color: "#fff" }}>
      <h1>💐 A Bouquet for You</h1>

      {/* Bouquet */}
      <div
        style={{
          position: "relative",
          height: 260,
          width: 300,
          margin: "40px auto",
          border:
            selectedFlowers.length === 0
              ? "1px dashed rgba(255,255,255,0.3)"
              : "none"
        }}
      >
        {selectedFlowers.length === 0 && (
          <p style={{ opacity: 0.6 }}>No flowers selected</p>
        )}

        {selectedFlowers.map((f, i) => {
          const slot =
            flowerSlots[i] || flowerSlots[flowerSlots.length - 1];

          return (
            <img
              key={`${f.id}-${i}`} // allows duplicates
              src={f.image}
              alt={f.name}
              style={{
                width: 110,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `
                  translate(-50%, -50%)
                  translate(${slot.x}px, ${slot.y}px)
                  rotate(${slot.r}deg)
                `,
                transition: "all 0.3s ease"
              }}
            />
          );
        })}
      </div>

      {/* Message Card */}
      <div
        style={{
          background: "#fff",
          color: "#000",
          width: 340,
          padding: "28px 24px",
          margin: "40px auto",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          transform: "rotate(-1.5deg)",
          fontFamily: "'Courier New', monospace"
        }}
      >
        <p style={{ marginBottom: 20 }}>Dear you,</p>

        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
          {message || " "}
        </p>

        <p style={{ marginTop: 30, textAlign: "right" }}>
          Sincerely,
          <br />
          Someone
        </p>
      </div>
    </div>
  );
}
