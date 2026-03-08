import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        Wildfire Risk System
      </div>

      <ul className="sidebar-menu">

        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Dashboard</Link>
        </li>

        <li className={location.pathname === "/risk" ? "active" : ""}>
          <Link to="/risk">Risk Tahmini</Link>
        </li>

        <li>
          Risk Haritası
        </li>

        <li>
          Aktif Yangınlar
        </li>

        <li>
          Veri Analizi
        </li>

      </ul>

    </div>

  );
}

export default Sidebar;