import { useSearchParams } from "react-router-dom";
import { flowers } from "../data/flowers";

export default function View() {
  const [params] = useSearchParams();

  const flowerIds = params.get("f")?.split(",") || [];
  const message = decodeURIComponent(params.get("m") || "");

const flowerSlots = [
  // Center front (largest & highest z-index)
  { x: 0,   y: 10,  r: 0,   s: 1.1, z: 5 }, 

  // Middle layer, slightly varied
  { x: -40, y: -20, r: -15, s: 0.95, z: 4 },
  { x: 50,  y: -15, r: 10,  s: 0.95, z: 4 },
  { x: -15, y: -45, r: -5,  s: 0.9, z: 4 },

  // Back layer (tucked in, smaller scale)
  { x: -80, y: -50, r: -25, s: 0.8, z: 3 },
  { x: 80,  y: -40, r: 20,  s: 0.8, z: 3 },
  { x: 0,   y: -80, r: 0,   s: 0.85, z: 3 }, // top center

  // Bottom tucked (filler flowers)
  { x: -30, y: 40, r: -10, s: 0.7, z: 2 },
  { x: 30,  y: 45, r: 10,  s: 0.7, z: 2 },
  { x: 0,   y: 70, r: 0,   s: 0.65, z: 1 } // very bottom center
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
                width: 120,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `
                  translate(-50%, -50%)
                  translate(${slot.x}px, ${slot.y}px)
                  rotate(${slot.r}deg)
                  scale(${slot.s})
                `,
                zIndex: slot.z,
                transition: "all 0.4s ease",
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))"
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
          transform: "rotate(-1deg)",
          fontFamily: "'Courier New', monospace"
        }}
      >
        {message?.trim() && (
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
            {message}
          </p>
        )}

      </div>
    </div>
  );
}
