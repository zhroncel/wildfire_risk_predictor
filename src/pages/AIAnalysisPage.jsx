import { useEffect, useState } from "react";
import AIChat from "../components/AIChat";
import "../App.css";

function AIAnalysisPage() {

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastFireAnalysis");
    if (data) {
      setAnalysis(JSON.parse(data));
    }
  }, []);

  return (
    <div className="analysis-page">

      <h2>🤖 AI Yangın Analiz Asistanı</h2>

      {analysis && (
        <div className="analysis-card">
          <h3>Son Analiz</h3>

          <p><b>Risk:</b> {analysis.risk_level}</p>
          <p><b>Tahmini Büyüklük:</b> {analysis.predicted_fire_size} ha</p>
          <p><b>Sıcaklık:</b> {analysis.temperature} °C</p>
          <p><b>Nem:</b> %{analysis.humidity}</p>
          <p><b>Rüzgar:</b> {analysis.wind} km/h</p>

          <p className="analysis-info">
            Bu veri hakkında AI'ya soru sorabilirsiniz.
          </p>
        </div>
      )}

      <AIChat analysis={analysis} />

    </div>
  );
}

export default AIAnalysisPage;