import RiskHeatmap from "../components/RiskHeatmap";
import "../App.css";

export default function RiskHeatmapPage() {
  return (
    <div className="risk-page">

      {/* MAP CARD */}
      <div className="dashboard-map">
        <RiskHeatmap />
      </div>

      {/* LEGEND CARD */}
      <div className="dashboard-card legend-card">

        

        <div className="legend-item">🟩 Low Risk</div>
        <div className="legend-item">🟧 Medium Risk</div>
        <div className="legend-item">🟥 High Risk</div>

      </div>

    </div>
  );
}