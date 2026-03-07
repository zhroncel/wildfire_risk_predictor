import { useState } from "react";
import { predictRisk } from "../services/api";
import RiskBox from "./RiskBox";

function ScenarioPanel() {

  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(5);
  const [humidity, setHumidity] = useState(40);

  const [risk, setRisk] = useState(null);

  const runPrediction = async () => {

    const data = {
      latitude: 37,
      longitude: -120,

      Temp_pre_30: temp,
      Temp_pre_15: temp,
      Temp_pre_7: temp,

      Wind_pre_30: wind,
      Wind_pre_15: wind,
      Wind_pre_7: wind,

      Hum_pre_30: humidity,
      Hum_pre_15: humidity,
      Hum_pre_7: humidity,

      Prec_pre_30: 0,
      Prec_pre_15: 0,
      Prec_pre_7: 0,

      Vegetation: 5,
      remoteness: 0.4
    };

    const result = await predictRisk(data);

    setRisk(result);
  };

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
        onClick={runPrediction}
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

     {risk && <RiskBox result={risk} />}

    </div>
  );
}

export default ScenarioPanel;