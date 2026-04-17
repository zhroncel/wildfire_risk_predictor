import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import MapCard from "./components/MapCard";
import ScenarioPanel from "./components/ScenarioPanel";
import Dashboard from "./pages/Dashboard";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AIAnalysisPage from "./pages/AIAnalysisPage";
import RiskHeatmapPage from "./pages/RiskHeatmapPage";
import ActiveFiresPage from "./pages/ActiveFiresPage";

import Profile from "./pages/Profile";
import Passwords from "./pages/Passwords";
import NewProfile from "./pages/NewProfile";


function App() {
  const [position, setPosition] = useState(null);
  const [prediction, setPrediction] = useState(null);

  return (
    <BrowserRouter>

      <div className="app-container">

        <Sidebar />

        <div className="main-content">
          <Header />

          <Routes>

            {/* PROFIL SAYFALARI */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/passwords" element={<Passwords />} />
            <Route path="/new-profile" element={<NewProfile />} />

            {/* ANA SAYFA */}
            <Route path="/" element={<Dashboard />} />

            {/* RISK */}
            <Route
              path="/risk"
              element={
                <div className="dashboard-grid">
                  <MapCard
                    position={position}
                    setPosition={setPosition}
                    prediction={prediction}
                    setPrediction={setPrediction}
                  />
                  <ScenarioPanel
                    position={position}
                    setPrediction={setPrediction}
                    prediction={prediction}
                  />
                </div>
              }
            />

            {/* DIGER */}
            <Route path="/risk-heatmap" element={<RiskHeatmapPage />} />
            <Route path="/active-fires" element={<ActiveFiresPage />} />
            <Route path="/analysis" element={<AIAnalysisPage />} />

          </Routes>
        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;