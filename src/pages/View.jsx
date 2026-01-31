import { useSearchParams } from "react-router-dom";
import { flowers } from "../data/flowers";

export default function View() {
  const [params] = useSearchParams();
  const flowerIds = params.get("f")?.split(",") || [];
  const message = params.get("m") || "";

  const selectedFlowers = flowers.filter(f =>
    flowerIds.includes(f.id)
  );

  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1>💐 A Bouquet for You</h1>

      <div
  style={{
    position: "relative",
    height: 220,
    marginTop: 30,
    marginBottom: 20
  }}
>
  {selectedFlowers.map((f, i) => {
    const angle = (i - (selectedFlowers.length - 1) / 2) * 12;

    return (
      <img
        key={f.id}
        src={f.image}
        alt={f.name}
        style={{
          width: 110,
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: `
            translateX(-50%)
            rotate(${angle}deg)
            translateY(${Math.abs(angle) * -1}px)
          `,
          transformOrigin: "bottom center",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
        }}
      />
    );
  })}
      </div>


      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}
