import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import { useEffect, useState } from "react";
import { getHeatmap } from "../services/api";

export default function RiskHeatmap() {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getHeatmap();
      setCells(data);
    }
    load();
  }, []);

  function getColor(score) {
    if (score > 0.7) return "red";
    if (score > 0.4) return "orange";
    return "green";
  }

  return (
    <MapContainer center={[39, 35]} zoom={6} style={{ height: "600px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cells.map((cell, i) => {
        const lat = cell.lat_bin;
        const lon = cell.lon_bin;

        return (
          <Rectangle
            key={i}
            bounds={[
              [lat, lon],
              [lat + 2, lon + 2],
            ]}
            pathOptions={{
              color: getColor(cell.regional_risk_score),
              fillOpacity: 0.4,
            }}
          />
        );
      })}
    </MapContainer>
  );
}