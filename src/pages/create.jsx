import { useState } from "react";
import { flowers } from "../data/flowers";

export default function Create() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const min_flower=4;
  const max_flower=10;
  const isMaxReached = selected.length >= max_flower;


  function addFlower(id) {
    setSelected(prev => {
      if (prev.length >= max_flower) return prev;
      return [...prev, id];
    });
  }

  const removeFlower = (id) => {
  setSelected(prev => prev.filter(flowerId => flowerId !== id));
  };

  function generateLink() {
    const f = selected.join(",");
    const m = encodeURIComponent(message);
    const url = `${window.location.origin}/view?f=${f}&m=${m}`;
    setShareUrl(url);
    setShowModal(true);
  }

  const selectedCounts = selected.reduce((acc, id) => {
  acc[id] = (acc[id] || 0) + 1;
  return acc;
  }, {});

  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1>🌸 Build a Bouquet</h1>
      <h5>Select between 4 to 10 Flowers</h5>
      {/* Flower selection */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 30
        }}
      >
        {flowers.map(flower => (
          <button    
          key={flower.id}
          onClick={() => addFlower(flower.id)}
  style={{
    background: "transparent",
    border: "none",
    position: "relative",
    cursor: isMaxReached ? "not-allowed" : "pointer",
    opacity: isMaxReached ? 0.5 : 1,
    transition: "transform 0.2s ease", 
    opacity: "0.2s ease"
  }}
>
  <img
    src={flower.image}
    alt={flower.name}
    style={{ width: 90 }}
  />

  {(() => {
    const count = selected.filter(id => id === flower.id).length;
    return count > 0 ? (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "#000",
          color: "#fff",
          width: 22,
          height: 22,
          borderRadius: "50%",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {count}
      </div>
    ) : null;
  })()}
</button>
        ))}
      </div>

        {Object.keys(selectedCounts).length > 0 && (
  <div
    style={{
      marginTop: 30,
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 10
    }}
  >
    {Object.entries(selectedCounts).map(([id, count]) => {
      const flower = flowers.find(f => f.id === id);
      if (!flower) return null;

      return (
        <button
          key={id}
          onClick={() => removeFlower(id)}
          style={{
            padding: "6px 12px",
            borderRadius: 20,
            border: "1px solid #ccc",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
            transition: "all 0.2s ease"
          }}
        >
          {flower.name.toUpperCase()} × {count}
        </button>
      );
    })}
  </div>
)}


      {/* Message box */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center"
        }}
      >

        <textarea
          placeholder="Write a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{
            width: 320,
            height: 100,
            padding: 12,
            borderRadius: 8,
            resize: "none"
          }}
        />
      </div>

      {/* Create button */}
      <button
        onClick={generateLink}
        disabled={selected.length<min_flower}
        style={{
          marginTop: 24,
          padding: "10px 18px",
          borderRadius: 8,
          cursor: selected.length < min_flower ? "not-allowed" : "pointer",
          opacity: selected.length < min_flower ? 0.5 : 1
        }}
      >
        Create Bouquet 💐
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#222",
              padding: 20,
              borderRadius: 12,
              width: 320,
              textAlign: "center"
            }}
          >
            <h3>💐 Your bouquet is ready</h3>
            <p>Share this link with someone special</p>

            <input
              value={shareUrl}
              readOnly
              style={{ width: "100%", padding: 8 }}
            />

            <div style={{ marginTop: 14 }}>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                Copy Link 📋
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
