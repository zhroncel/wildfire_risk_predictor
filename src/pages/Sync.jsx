import { useState } from "react";

function Sync() {
  const [sync, setSync] = useState(true);

  return (
    <div className="page">
      <h2>Eşitleme Ayarları</h2>

      <div className="form">
        <label>
          <input 
            type="checkbox" 
            checked={sync}
            onChange={() => setSync(!sync)}
          />
          Eşitleme Açık
        </label>
      </div>
    </div>
  );
}

export default Sync;