import ActiveFiresMap from "../components/ActiveFiresMap";
import ActiveFiresPanel from "../components/ActiveFiresPanel";
import "../App.css";

export default function ActiveFiresPage() {
  return (
    <div className="active-fires-page">

      <div className="active-fires-map-wrapper">
        <div className="dashboard-map">
          <ActiveFiresMap />
        </div>
      </div>

      <div className="active-fires-panel-wrapper">
        <div className="dashboard-card">
          <ActiveFiresPanel />
        </div>
      </div>
    </div>
  );
}