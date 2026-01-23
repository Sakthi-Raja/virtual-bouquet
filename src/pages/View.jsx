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

      <div style={{ fontSize: 32 }}>
        {selectedFlowers.map(f => (
          <span key={f.id} style={{ margin: 8 }}>
            {f.name.split(" ")[1]}
          </span>
        ))}
      </div>

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}
