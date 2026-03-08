import { useState } from "react";
import { predictRisk } from "../services/api";
import RiskBox from "./RiskBox";
import { getWeather } from "../services/api";
import { useEffect } from "react";
function ScenarioPanel({ position, setPrediction, prediction }) {
  // Otomatik hava durumu modu seçili mi?
  const [isAutoWeather, setIsAutoWeather] = useState(true);

  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(5);
  const [humidity, setHumidity] = useState(40);
  const [vegetation, setVegetation] = useState(5);
  const [remoteness, setRemoteness] = useState(0.4);
  useEffect(() => {
    if (!position || !isAutoWeather) return;

    const loadWeather = async () => {
      const data = await getWeather(position.lat, position.lng);

      if (!data.error) {
        setTemp(data.temperature);
        setHumidity(data.humidity);
        setWind(data.wind);
      }
    };

    loadWeather();
  }, [position, isAutoWeather]);

  const runPrediction = async () => {
    if (!position) {
      alert("Lütfen önce haritadan bir konum seçin.");
      return;
    }

    const data = {
      latitude: position.lat,
      longitude: position.lng,
      Vegetation: parseFloat(vegetation),
      remoteness: parseFloat(remoteness),
      // Eğer otomatiğe alınmışsa değerleri göndermiyoruz (Backend API'den çekecek)
      Temp_pre_7: parseFloat(temp),
      Temp_pre_15: parseFloat(temp),
      Temp_pre_30: parseFloat(temp),

      Wind_pre_7: parseFloat(wind),
      Wind_pre_15: parseFloat(wind),
      Wind_pre_30: parseFloat(wind),

      Hum_pre_7: parseFloat(humidity),
      Hum_pre_15: parseFloat(humidity),
      Hum_pre_30: parseFloat(humidity),
      // Yağış backend'de opsiyonel, null bırakılabilir
      Prec_pre_7: null, Prec_pre_15: null, Prec_pre_30: null
    };

    const result = await predictRisk(data);
    setPrediction(result);
  };

  return (
    <div className="scenario-card">
      <h3 className="panel-title">🔥 Senaryo Analizi</h3>

      {/* Otomatik/Manuel Seçici */}
      <div className="mode-toggle">
        <button
          className={isAutoWeather ? "active" : ""}
          onClick={() => setIsAutoWeather(true)}
        >
          Canlı Hava Durumu
        </button>
        <button
          className={!isAutoWeather ? "active" : ""}
          onClick={() => setIsAutoWeather(false)}
        >
          Manuel Simülasyon
        </button>
      </div>

      <div className={`form-grid ${isAutoWeather ? "disabled-grid" : ""}`}>
        <div className="form-group">
          <label>Sıcaklık {!isAutoWeather && `(${temp}°C)`}</label>
          <input
            type="range" min="-10" max="50" value={temp}
            onChange={(e) => setTemp(e.target.value)}
            disabled={isAutoWeather}
          />
        </div>
        <div className="form-group">
          <label>Rüzgar {!isAutoWeather && `(${wind} km/h)`}</label>
          <input
            type="range" min="0" max="120" value={wind}
            onChange={(e) => setWind(e.target.value)}
            disabled={isAutoWeather}
          />
        </div>
        <div className="form-group">
          <label>Nem {!isAutoWeather && `(%${humidity})`}</label>
          <input
            type="range" min="0" max="100" value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            disabled={isAutoWeather}
          />
        </div>
        <div className="form-group">
          <label>Bitki Yoğunluğu</label>
          <input type="number" value={vegetation} onChange={(e) => setVegetation(e.target.value)} />
        </div>
        <div className="form-group full-width">
          <label>Yerleşimden Uzaklık ({remoteness} km)</label>
          <input type="range" step="0.1" min="0" max="1" value={remoteness} onChange={(e) => setRemoteness(e.target.value)} />
        </div>
      </div>

      <button className="predict-btn" onClick={runPrediction}>
        {isAutoWeather ? "Gerçek Verilerle Tahmin Yap" : "Senaryoyu Test Et"}
      </button>

      {prediction && <RiskBox result={prediction} />}
    </div>
  );
}

export default ScenarioPanel;