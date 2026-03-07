import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getActiveFires } from "../services/api";
import { useEffect, useState } from "react";
import { CircleMarker } from "react-leaflet";
function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

function Map() {
  const [position, setPosition] = useState(null);
  const [fires, setFires] = useState([]);
  useEffect(() => {
    const loadFires = async () => {
      const data = await getActiveFires();
      setFires(data);
    };

    loadFires();
  }, []);

  return (
    <div>
      <MapContainer
        center={[37.8, -96]}   // ABD merkezi
        zoom={4}
        maxBounds={[
          [24.396308, -125.0],   // Güneybatı ABD
          [49.384358, -66.93457] // Kuzeydoğu ABD
        ]}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setPosition={setPosition} />
        {fires.map((fire, index) => (
          <CircleMarker
            key={index}
            center={[fire.latitude, fire.longitude]}
            radius={4}
            pathOptions={{
              color: fire.confidence === "h" ? "red" : "orange",
            }}
          />
        ))}
        
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
