import { MapContainer, TileLayer, useMapEvents, CircleMarker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import { useEffect, useState } from "react";
import { getActiveFires } from "../services/api";

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });

  return null;
}

function Map({ position, setPosition, prediction }) {

  const [fires, setFires] = useState([]);


  const [time, setTime] = useState(0);

  const growthRadius = prediction
    ? prediction.predicted_fire_size * time * 50
    : 0;

 

  return (
    <>
      <MapContainer
        center={[39, 35]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationMarker setPosition={setPosition} />

        {fires.map((fire, index) => (
          <CircleMarker
            key={index}
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
          />
        ))}

        {position && (
          <CircleMarker
            center={[position.lat, position.lng]}
            radius={10}
          />
        )}

        {prediction && position && (
          <Circle
            center={[position.lat, position.lng]}
            radius={growthRadius}
            pathOptions={{
              color: "red",
              fillOpacity: 0.2
            }}
          />
        )}

      </MapContainer>

      <div style={{ marginTop: "10px" }}>
        <input
          type="range"
          min="0"
          max="24"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
        <p>Saat: {time}</p>
      </div>
      <div className="time-slider">
        <label>Yangın Yayılma Süresi: {time} saat</label>

        <input
          type="range"
          min="0"
          max="24"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>
    </>
  );
}

export default Map;