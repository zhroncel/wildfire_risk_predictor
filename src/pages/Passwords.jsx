import { useState } from "react";

function Passwords() {
  const [password, setPassword] = useState("");

  const handleChange = () => {
    alert("Şifre güncellendi");
  };

  return (
    <div className="page">
      <h2>Parola Değiştir</h2>

      <div className="form">
        <label>Yeni Şifre</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleChange}>Güncelle</button>
      </div>
    </div>
  );
}

export default Passwords;