import { useSearchParams } from "react-router-dom";
import { flowers, bush } from "../data/flowers";
 
export default function View() {
  const [params] = useSearchParams();
 
  const flowerIds = params.get("f")?.split(",") || [];
  const message = decodeURIComponent(params.get("m") || "");
 
  // Max 4 stem flowers (user can pick up to 10 total, min 4)
  // Stems always go to edges — 4 slots covers worst case
  const stemSlots = [
    { x: -95,  y: -45,  r: -32,  s: 0.82, z: 2 }, // far left
    { x:  95,  y: -40,  r:  30,  s: 0.82, z: 2 }, // far right
    { x: -70,  y: -80,  r: -22,  s: 0.76, z: 2 }, // back left
    { x:  70,  y: -75,  r:  20,  s: 0.76, z: 2 }, // back right
  ];
 
  // 10 bloom slots — enough to show all flowers even if user picks 0 stems
  // Spread more deliberately so no two slots heavily overlap
  const bloomSlots = [
    // FRONT CENTER
    { x:   0,  y: -55,  r:   0,  s: 1.00, z: 5 },
    // MIDDLE RING
    { x: -52,  y: -88,  r: -18,  s: 0.90, z: 4 },
    { x:  52,  y: -84,  r:  16,  s: 0.90, z: 4 },
    { x:   0,  y: -122,  r:  -4,  s: 0.88, z: 4 },
    // BACK RING — wider spread so they don't hide each other
    { x: -80,  y: -102,  r: -24,  s: 0.80, z: 3 },
    { x:  80,  y: -98,  r:  22,  s: 0.80, z: 3 },
    { x: -30,  y: -145, r: -14,  s: 0.78, z: 3 },
    { x:  35,  y: -140, r:  16,  s: 0.78, z: 3 },
    // BOTTOM PEEK — partially visible inside bush
    { x: -58,  y: 5,  r: -12,  s: 0.82, z: 3 },
    { x:  50,  y: 5,  r:  13,  s: 0.82, z: 3 },
  ];
 
  const selectedFlowers = flowerIds
    .map(id => flowers.find(f => f.id === id))
    .filter(Boolean);
 
  const stemFlowers  = selectedFlowers.filter(f => f.type === "stem");
  const bloomFlowers = selectedFlowers.filter(f => f.type !== "stem");
 
  function getBloomYOffset(z) {
    if (z >= 5) return 85;
    if (z >= 4) return 58;
    if (z >= 3) return 28;
    return 0;
  }
 
  return (
    <div style={{ padding: "12px 24px 24px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ margin: 40 }}>Bouquet for You</h1>
 
      {/* Height reduced from 380 → 300 to cut dead space at top.
          Flowers are anchored at top:72% so the bottom 72% is active;
          the top ~28% (84px) was just empty — now removed.           */}
      <div
        style={{
          position: "relative",
          height: 300,
          width: 420,
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
 
        {/* STEM flowers — edges, always behind blooms */}
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
                zIndex: slot.z,
                transition: "all 0.4s ease",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))"
              }}
            />
          );
        })}
 
        {/* BLOOM flowers — center cluster, always in front of stems */}
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
                zIndex: slot.z + 2,
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