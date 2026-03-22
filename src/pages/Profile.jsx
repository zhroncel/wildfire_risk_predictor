import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const [name, setName] = useState("Zehra");
  const [email, setEmail] = useState("220911865@stu.istinye.edu.tr");
  const [region, setRegion] = useState("Marmara");
  const [phone, setPhone] = useState("");
  const [topAlert, setTopAlert] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setName(savedUser.name);
      setEmail(savedUser.email);
      setRegion(savedUser.region);
      setPhone(savedUser.phone || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      region,
      phone,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // sidebar update
    window.dispatchEvent(new Event("userUpdated"));

    setTopAlert("Bilgiler başarıyla güncellendi");

    setTimeout(() => {
      setTopAlert("");
    }, 3000);
  };

  return (
    
    <div className="profile-page-container">
      {/* ALERT */}
      {topAlert && (
        <div className="top-alert">
          {topAlert}
        </div>
      )}

      <div className="profile-main-card">

        {/* SOL */}
        <div className="profile-left">
          <FaUser className="profile-avatar" />

          <h3>{name}</h3>
          <p className="profile-email">{email}</p>

          <p className="profile-meta">📞 {phone}</p>
          <p className="profile-meta">📍 {region}</p>
        </div>

        {/* SAĞ */}
        <form className="profile-right" onSubmit={handleSubmit}>

          {/* ROW 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Ad Soyad</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                placeholder="05xx xxx xx xx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Sorumlu Bölge</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option>Marmara</option>
                <option>Ege</option>
                <option>Akdeniz</option>
                <option>Karadeniz</option>
                <option>Doğu Anadolu</option>
                <option>Güneydoğu Anadolu</option>
                
              </select>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Rol</label>
              <input value="Admin" disabled />
            </div>
          </div>

          <button className="save-btn">
            Bilgileri Güncelle
          </button>

        </form>

      </div>
    </div>
  );
};

export default Profile;