function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>MENU</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "10px 0" }}>Ana Sayfa</li>
        <li style={{ margin: "10px 0", color: "#60a5fa" }}>
          Risk Tahmini
        </li>
        <li style={{ margin: "10px 0" }}>Veri Analizi</li>
        <li style={{ margin: "10px 0" }}>Hakkında</li>
      </ul>
    </div>
  );
}

export default Sidebar;
