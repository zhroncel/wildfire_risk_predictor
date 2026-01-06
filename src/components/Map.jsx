import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

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
