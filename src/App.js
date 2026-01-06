import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import MapCard from "./components/MapCard";
import ScenarioPanel from "./components/ScenarioPanel";
import RiskBox from "./components/RiskBox";

function App() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sol Menü */}
      <Sidebar />

      {/* Sağ İçerik */}
      <div style={{ flex: 1 }}>
        <Header />

        <div
          style={{
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          {/* Sol taraf */}
          <MapCard />

          {/* Sağ taraf */}
          <div>
            <ScenarioPanel />
            <RiskBox risk={0.85} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
