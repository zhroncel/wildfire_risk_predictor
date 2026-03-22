import { useEffect, useState } from "react";
import { getActiveFires } from "../services/api";

export default function ActiveFiresPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getActiveFires();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h3>🔥 Active Fires</h3>
      <p>Total Fires: {data.count}</p>

      <h4>Recent Fires</h4>

      {data.fires.slice(0,5).map((f, i) => (
        <div key={i}>
          {f.latitude.toFixed(2)} , {f.longitude.toFixed(2)}
        </div>
      ))}
    </div>
  );
}