import { useState } from "react";

function ScenarioPanel() {
  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(5);
  const [humidity, setHumidity] = useState(40);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3>Senaryo Ayarları</h3>

      <label>Sıcaklık: {temp} °C</label>
      <input
        type="range"
        min="0"
        max="50"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
      />

      <br />

      <label>Rüzgar: {wind} km/s</label>
      <input
        type="range"
        min="0"
        max="30"
        value={wind}
        onChange={(e) => setWind(e.target.value)}
      />

      <br />

      <label>Nem: {humidity} %</label>
      <input
        type="range"
        min="0"
        max="100"
        value={humidity}
        onChange={(e) => setHumidity(e.target.value)}
      />

      <button
        style={{
          marginTop: "15px",
          padding: "10px",
          width: "100%",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Risk Tahmini Yap
      </button>
    </div>
  );
}

export default ScenarioPanel;

