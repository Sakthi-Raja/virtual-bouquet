import { useSearchParams } from "react-router-dom";
import { flowers, bush } from "../data/flowers";
 
export default function View() {
  const [params] = useSearchParams();
 
  const flowerIds = params.get("f")?.split(",") || [];
  const message = decodeURIComponent(params.get("m") || "");
 
  // Slots are split into two groups:
  // STEM slots  — far edges, angled outward so stems fan away from center
  // BLOOM slots — center cluster where blooms look natural without stems
  const stemSlots = [
    { x: -95,  y: -45,  r: -32,  s: 0.82, z: 2 }, // far left,  leans left
    { x:  95,  y: -40,  r:  30,  s: 0.82, z: 2 }, // far right, leans right
    { x: -70,  y: -80,  r: -22,  s: 0.76, z: 2 }, // back left
    { x:  70,  y: -75,  r:  20,  s: 0.76, z: 2 }, // back right
  ];
 
  const bloomSlots = [
    // FRONT CENTER
    { x: 0,    y: -20,  r:  0,   s: 1.0,  z: 5 },
    // MIDDLE RING
    { x: -48,  y: -55,  r: -18,  s: 0.90, z: 4 },
    { x:  52,  y: -50,  r:  16,  s: 0.90, z: 4 },
    { x:   0,  y: -88,  r:  -4,  s: 0.88, z: 4 },
    // BACK RING
    { x: -30,  y: -108, r: -14,  s: 0.80, z: 3 },
    { x:  35,  y: -103, r:  16,  s: 0.80, z: 3 },
    // BOTTOM PEEK (inside bush foliage)
    { x: -30,  y:  20,  r: -10,  s: 0.65, z: 3 },
    { x:  35,  y:  24,  r:  12,  s: 0.65, z: 3 },
  ];
 
  const selectedFlowers = flowerIds
    .map(id => flowers.find(f => f.id === id))
    .filter(Boolean);
 
  const stemFlowers  = selectedFlowers.filter(f => f.type === "stem");
  const bloomFlowers = selectedFlowers.filter(f => f.type !== "stem");
 
  // Blooms get a y nudge downward based on z so they sit naturally in the cluster
  function getBloomYOffset(z) {
    if (z >= 5) return 90;
    if (z >= 4) return 60;
    if (z >= 3) return 30;
    return 0;
  }
 
  return (
    <div style={{ padding: "12px 24px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ margin: 0 }}> A   Bouquet for You</h1>
 
      <div
        style={{
          position: "relative",
          height: 380,
          width: 400,
          margin: "0 auto",
        }}
      >
        {/* Bush base layer */}
        <img
          src={bush}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 420,
            zIndex: 1,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
 
        {/* STEM flowers — rendered first (behind everything), placed at edges */}
        {stemFlowers.map((f, i) => {
          const slot = stemSlots[i] || stemSlots[stemSlots.length - 1];
          return (
            <img
              key={`stem-${f.id}-${i}`}
              src={f.image}
              alt={f.name}
              style={{
                width: 110,
                position: "absolute",
                left: "50%",
                top: "72%",
                transform: `
                  translate(-50%, -50%)
                  translate(${slot.x}px, ${slot.y}px)
                  rotate(${slot.r}deg)
                  scale(${slot.s})
                `,
                zIndex: slot.z,   // max z:2 — always behind all blooms
                transition: "all 0.4s ease",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))"
              }}
            />
          );
        })}
 
        {/* BLOOM flowers — rendered on top, clustered in center */}
        {bloomFlowers.map((f, i) => {
          const slot = bloomSlots[i] || bloomSlots[bloomSlots.length - 1];
          const y = slot.y + getBloomYOffset(slot.z);
          return (
            <img
              key={`bloom-${f.id}-${i}`}
              src={f.image}
              alt={f.name}
              style={{
                width: 110,
                position: "absolute",
                left: "50%",
                top: "72%",
                transform: `
                  translate(-50%, -50%)
                  translate(${slot.x}px, ${y}px)
                  rotate(${slot.r}deg)
                  scale(${slot.s})
                `,
                zIndex: slot.z + 2,  // min z:5 — always in front of stems
                transition: "all 0.4s ease",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
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
          margin: "12px auto",
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