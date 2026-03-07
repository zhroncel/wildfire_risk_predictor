import { MapContainer, TileLayer, useMapEvents, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { getActiveFires } from "../services/api";
import { useEffect, useState } from "react";
import { predictRisk } from "../services/api";
import RiskBox from "./RiskBox";
function LocationMarker({ setPosition, setPrediction }) {
  useMapEvents({
    async click(e) {

      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      setPosition(e.latlng);

      const data = {
        latitude: lat,
        longitude: lon,

        Temp_pre_30: null,
        Temp_pre_15: null,
        Temp_pre_7: null,

        Wind_pre_30: null,
        Wind_pre_15: null,
        Wind_pre_7: null,

        Hum_pre_30: null,
        Hum_pre_15: null,
        Hum_pre_7: null,

        Prec_pre_30: 0,
        Prec_pre_15: 0,
        Prec_pre_7: 0,

        Vegetation: 5,
        remoteness: 0.4
      };

      const result = await predictRisk(data);

      setPrediction(result);
    },
  });
  return null;
}

function Map() {
  const [position, setPosition] = useState(null);
  const [fires, setFires] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadFires = async () => {
      const data = await getActiveFires();
      setFires(data.fires); // backend {count,fires}
    };

    loadFires();
  }, []);

  return (
    <div>
      <MapContainer
        center={[39, 35]}   // Türkiye merkezi
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          setPosition={setPosition}
          setPrediction={setPrediction}
        />

        <MarkerClusterGroup>
          {fires.map((fire, index) => (
            <CircleMarker
              key={index}
              center={[fire.latitude, fire.longitude]}
              radius={5}
              pathOptions={{
                color:
                  fire.confidence === "h"
                    ? "red"
                    : fire.confidence === "n"
                      ? "orange"
                      : "yellow",
              }}
            />
          ))}
        </MarkerClusterGroup>
        {prediction && position && (
          <CircleMarker
            center={[position.lat, position.lng]}
            radius={10}
            pathOptions={{
              color:
                prediction.risk_level === "High"
                  ? "red"
                  : prediction.risk_level === "Medium"
                    ? "orange"
                    : "green",
            }}
          />
        )}

      </MapContainer>
      

      {position && (
        <p>
          Seçilen Konum: {position.lat.toFixed(4)} ,{" "}
          {position.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}


export default Map;