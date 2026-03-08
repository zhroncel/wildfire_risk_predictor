import "../App.css"; 
import FireGrowthChart from "./FireGrowthChart";
function RiskBox({ result }) {
  if (!result) return null;

  const { 
    risk_score, risk_level, predicted_fire_size,
    meteorology_score, regional_score, model_score 
  } = result;

  const level = risk_level?.toLowerCase() || "low";
  const riskClass = `risk-box risk-${level}`;
  const badgeClass = `risk-level-badge ${level}-bg`;

  return (
    <div className={riskClass}>
      <div className="risk-header">
        <h3 style={{margin: 0}}>🔥 Analiz Sonucu</h3>
        <span className={badgeClass}>{risk_level} Risk</span>
      </div>

      <div className="stat-item" style={{background: 'white', marginBottom: '10px'}}>
        <span className="stat-label">GENEL RİSK SKORU</span>
        <span className="stat-value" style={{fontSize: '1.5rem'}}>{risk_score?.toFixed(2)}</span>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Tahmini Büyüklük</span>
          <span className="stat-value">{predicted_fire_size?.toFixed(2)} ha</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Meteoroloji</span>
          <span className="stat-value">{meteorology_score?.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Bölgesel Risk</span>
          <span className="stat-value">{regional_score?.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Model Skoru</span>
          <span className="stat-value">{model_score?.toFixed(2)}</span>
        </div>
      </div>

      {risk_level === "High" && (
        <div className="danger-alert">
          ⚠️ KRİTİK SEVİYE: Acil Durum Hazırlığı Gerekli!
        </div>
      )}
      <FireGrowthChart size={predicted_fire_size} />
    </div>
  );
}

export default RiskBox;