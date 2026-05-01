import { useEffect, useState } from "react";
import { getActiveFires } from "../services/api";

export default function ActiveFiresPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getActiveFires();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div className="info-card">Loading...</div>;

  // risk hesaplama
  const high = data.fires.filter(f => f.confidence === "h").length;
  const medium = data.fires.filter(f => f.confidence === "n").length;
  const low = data.fires.filter(f => f.confidence === "l").length;

  return (
    <div className="right-panel">
      <div className="info-card"> 
        <h3>🔥 Active Fires</h3>
        <p><strong>Total Fires:</strong> {data.count}</p>

        <div className="fire-stats">  
          <div className="stat red">
            🔴 High: {high}
          </div>
          <div className="stat orange">
            🟠 Medium: {medium}
          </div>
          <div className="stat green">
            🟢 Low: {low}
          </div>
        </div>

        <h4>Recent Fires</h4>

        <div className="fire-list">
          {data.fires.slice(0, 10).map((f, i) => (
            <div
              key={i}
              className={`fire-item ${
                f.confidence === "h"
                  ? "high"
                  : f.confidence === "n"
                  ? "medium"
                  : "low"
              }`}
            >
              <span>
                📍 {f.latitude.toFixed(2)}, {f.longitude.toFixed(2)}
              </span>

              <span className="badge">
                {f.confidence}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}