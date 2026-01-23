import { useState } from "react";
import { flowers } from "../data/flowers";

export default function Create() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");

  const [shareUrl,setShareUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalStyle = {
  background: "#222",
  padding: 20,
  borderRadius: 12,
  width: 320,
  textAlign: "center"
};


  function toggleFlower(id) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  }

  function generateLink() {
    const f = selected.join(",");
    const m = encodeURIComponent(message);
    const url = `${window.location.origin}/view?f=${f}&m=${m}`;
    //alert(url); // temporary joy
    setShareUrl(url);
    setShowModal(true);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>🌸 Build a Bouquet</h1>

      <div>
        {flowers.map(flower => (
          <button
            key={flower.id}
            onClick={() => toggleFlower(flower.id)}
              style={{
                margin: 6,
                background: selected.includes(flower.id)
                ? "#ffb6c1"
                : "#f5f5f5",
                color: "#111",
                fontWeight: 500
              }}
            >
  {flower.name}
</button>
        ))}
      </div>

      <textarea
        placeholder="Write a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ display: "block", marginTop: 20, width: "100%" }}
      />

      <button onClick={generateLink} style={{ marginTop: 20 }}>
        Create Bouquet 💐
      </button>

      {showModal && (
  <div style={overlayStyle}>
    <div style={modalStyle}>
      <h3>💐 Your bouquet is ready</h3>
      <p>Share this link with someone special</p>

      <input
        value={shareUrl}
        readOnly
        style={{
          width: "100%",
          padding: 8,
          marginTop: 10
        }}
      />

      <div style={{ marginTop: 14 }}>
        <button onClick={() => {
          navigator.clipboard.writeText(shareUrl);
        }}>
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
