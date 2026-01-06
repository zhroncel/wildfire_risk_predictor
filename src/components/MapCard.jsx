import Map from "./Map";

function MapCard() {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3>Konum Seçimi</h3>
      <Map />
    </div>
  );
}

export default MapCard;
