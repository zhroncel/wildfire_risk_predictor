import { useState } from "react";

function NewProfile() {
  const [name, setName] = useState("");

  const handleCreate = () => {
    alert("Yeni profil oluşturuldu");
  };

  return (
    <div className="page">
      <h2>Yeni Profil Oluştur</h2>

      <div className="form">
        <label>Profil Adı</label>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleCreate}>Oluştur</button>
      </div>
    </div>
  );
}

export default NewProfile;