import Map from "./Map";
import "../App.css";

function MapCard({ position, setPosition, prediction }) {
  return (
    <div className="map-card">

      <h3>📍 Konum Seçimi</h3>

      <div className="map-container">

        <Map
          position={position}
          setPosition={setPosition}
          prediction={prediction}
        />

      </div>

    </div>
  );
}

// BU SATIRIN OLDUĞUNDAN EMİN OL:
export default MapCard;