import RiskHeatmap from "../components/RiskHeatmap";

export default function RiskHeatmapPage() {
  return (
    <div>

      <h2>Wildfire Risk Heatmap</h2>

      

      <RiskHeatmap />

      <div className="legend">

        <h4>Risk Levels</h4>

        <div>🟩 Low Risk</div>
        <div>🟧 Medium Risk</div>
        <div>🟥 High Risk</div>

      </div>

    </div>
  );
}