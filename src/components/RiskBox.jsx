function RiskBox({ result }) {

  if (!result) return null;

  const { 
    risk_score,
    risk_level,
    predicted_fire_size,
    meteorology_score,
    regional_score,
    model_score
  } = result;

  let color = "green";

  if (risk_level === "High") color = "red";
  if (risk_level === "Medium") color = "orange";

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
      <h3>🔥 Yangın Risk Analizi</h3>

      <p><b>Risk Seviyesi:</b> {risk_level}</p>

      <p><b>Risk Skoru:</b> {risk_score ? risk_score.toFixed(2) : "-"}</p>

      <hr />

      <p>
        <b>Tahmini Yangın Büyüklüğü:</b>{" "}
        {predicted_fire_size ? predicted_fire_size.toFixed(2) : "-"}
      </p>

      <p>
        <b>Model Skoru:</b>{" "}
        {model_score ? model_score.toFixed(2) : "-"}
      </p>

      <p>
        <b>Meteoroloji Skoru:</b>{" "}
        {meteorology_score ? meteorology_score.toFixed(2) : "-"}
      </p>

      <p>
        <b>Bölgesel Risk:</b>{" "}
        {regional_score ? regional_score.toFixed(2) : "-"}
      </p>

      {risk_level === "High" && (
        <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
          ⚠️ Yüksek Yangın Riski!
        </div>
      )}
    </div>
  );
}

export default RiskBox;