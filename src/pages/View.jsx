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
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20
  }}
>
  {selectedFlowers.map(f => (
    <img
      key={f.id}
      src={f.image}
      alt={f.name}
      style={{
        width: 90,
        margin: 10
      }}
    />
  ))}
</div>


      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}
