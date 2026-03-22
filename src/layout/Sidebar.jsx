import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  // 👤 USER
  const [user, setUser] = useState({
    name: "Zehra",
    email: "220911865@stu.istinye.edu.tr",
  });

  // 🌙 THEME
  const [darkMode, setDarkMode] = useState(true);

  // 🔔 NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    "🔥 Yeni analiz tamamlandı",
    "⚠️ Yüksek risk tespit edildi",
  ]);

  // kullanıcı yükle
  useEffect(() => {
    const loadUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) setUser(savedUser);
    };

    loadUser();
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  // tema yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.body.classList.add("light");
    }
  }, []);

  // dış tıklama
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔥 FUNCTIONS

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        Wildfire Risk System
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Dashboard</Link>
        </li>

        <li className={location.pathname === "/risk" ? "active" : ""}>
          <Link to="/risk">Risk Tahmini</Link>
        </li>

        <li className={location.pathname === "/risk-heatmap" ? "active" : ""}>
          <Link to="/risk-heatmap">Risk Haritası</Link>
        </li>

        <li className={location.pathname === "/active-fires" ? "active" : ""}>
          <Link to="/active-fires">Aktif Yangınlar</Link>
        </li>

        <li className={location.pathname === "/analysis" ? "active" : ""}>
          <Link to="/analysis">AI Veri Analizi</Link>
        </li>
      </ul>

      {/* PROFILE */}
      <div className="profile-card-wrapper" ref={profileRef}>

        <div 
          className="profile-card"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <FaUser className="user-icon" />
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">Admin</div>
          </div>
        </div>

        {openProfile && (
          <div className="user-dropdown">

            {/* HEADER */}
            <div className="user-dropdown-header">
              <FaUser className="avatar-icon" />
              <div>
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>

            {/* MENU */}
            <div className="user-dropdown-menu">

              <div onClick={() => navigate("/profile")}>
                ⚙️ Profil Ayarları
              </div>

              <div onClick={toggleTheme}>
                {darkMode ? "🌙 Koyu Mod" : "☀️ Aydınlık Mod"}
              </div>

              <div>
                🔔 Bildirimler ({notifications.length})
              </div>

              {/* NOTIFICATION LIST */}
              <div className="notification-box">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="notification-text"
                    onClick={() => removeNotification(i)}
                  >
                    {n}
                  </div>
                ))}
              </div>

              <div className="user-logout" onClick={handleLogout}>
                <FiLogOut /> Çıkış Yap
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Sidebar;