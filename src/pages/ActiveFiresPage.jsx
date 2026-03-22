import ActiveFiresMap from "../components/ActiveFiresMap";
import ActiveFiresPanel from "../components/ActiveFiresPanel";

export default function ActiveFiresPage() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ flex: 3 }}>
        <ActiveFiresMap />
      </div>

      <div style={{ flex: 1 }}>
        <ActiveFiresPanel />
      </div>
    </div>
  );
}