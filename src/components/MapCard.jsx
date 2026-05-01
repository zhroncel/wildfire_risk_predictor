import Map from "./Map";
import "../App.css";

function MapCard({ position, setPosition, prediction, setPrediction }) {
    return (
    <div className="map-card">

      <h3>📍 Konum Seçimi</h3>

      <div className="map-container">

        <Map
          position={position}
          setPosition={setPosition}
          prediction={prediction}
          setPrediction={setPrediction}
        />

      </div>

    </div>
  );
}

export default MapCard;