import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getActiveFires } from "../services/api";

export default function ActiveFiresMap() {
  const [fires, setFires] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getActiveFires();
      setFires(data.fires);
    }
    load();
  }, []);

  return (
    <MapContainer center={[39, 35]} zoom={6} style={{ height: "600px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {fires.map((fire, i) => (
        <CircleMarker
          key={i}
          center={[fire.latitude, fire.longitude]}
          radius={6}
          pathOptions={{
            color:
              fire.confidence === "h"
                ? "red"
                : fire.confidence === "n"
                ? "orange"
                : "yellow",
          }}
        >
          <Popup>
            🔥 Fire Detected<br />
            Confidence: {fire.confidence}<br />
            Lat: {fire.latitude}<br />
            Lon: {fire.longitude}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}