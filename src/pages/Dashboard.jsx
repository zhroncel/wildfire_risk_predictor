import { useEffect, useState, useRef } from "react";
import { getActiveFires } from "../services/api";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";

function Dashboard() {

    const [fires, setFires] = useState([]);
    const hasFetched = useRef(false);


    useEffect(() => {
        if (hasFetched.current) return;

        const loadFires = async () => {
            const data = await getActiveFires();
            setFires(data?.fires || []);
        };

        loadFires();
        hasFetched.current = true;

    }, []);
    const high = fires.filter(f => f.confidence === "h").length;
    const medium = fires.filter(f => f.confidence === "n").length;
    const low = fires.filter(f => f.confidence === "l").length;

    return (

        <div className="dashboard">

            {/* STAT CARDS */}

            <div className="stats-grid">

                <div className="stat-card">
                    <h4>🔥 Aktif Yangın</h4>
                    <p>{fires.length}</p>
                </div>

                <div className="stat-card">
                    <h4>⚠️ Yüksek Risk</h4>
                    <p>{high}</p>
                </div>

                <div className="stat-card">
                    <h4>🟠 Orta Risk</h4>
                    <p>{medium}</p>
                </div>

                <div className="stat-card">
                    <h4>🟢 Düşük Risk</h4>
                    <p>{low}</p>
                </div>

            </div>

            {/* HARİTA */}

            <div className="dashboard-map">

                <MapContainer
                    center={[39, 35]}
                    zoom={6}
                    style={{ height: "450px", width: "100%" }}
                >

                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {fires.map((fire, index) => (
                        <CircleMarker
                            key={index}
                            center={[fire.latitude, fire.longitude]}
                            radius={6}
                            pathOptions={{
                                color:
                                    fire.confidence === "h"
                                        ? "red"
                                        : fire.confidence === "n"
                                            ? "orange"
                                            : "yellow"
                            }}
                        />
                    ))}

                </MapContainer>

            </div>

        </div>

    );
}

export default Dashboard;