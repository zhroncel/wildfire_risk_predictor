function RiskBox({ risk }) {
  let color = "green";
  let text = "Düşük Risk";

  if (risk > 0.7) {
    color = "red";
    text = "Yüksek Risk";
  } else if (risk > 0.4) {
    color = "orange";
    text = "Orta Risk";
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        border: `2px solid ${color}`,
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3>Risk Durumu</h3>
      <p>{text}</p>
      <p>Risk Skoru: {risk}</p>

      {risk > 0.7 && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ YÜKSEK YANGIN RİSKİ!
        </div>
      )}
    </div>
  );
}

export default RiskBox;

