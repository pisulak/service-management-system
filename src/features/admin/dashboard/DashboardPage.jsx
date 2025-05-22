import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/AdminSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import StatScreen from "./StatsPanel.jsx";
import Today from "./TodayProtocols.jsx";
import Storage from "./StoragePanel.jsx";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="w-full">
        <Topbar />
        <StatScreen />

        <div className="grid grid-cols-2 gap-12 mt-10 mx-16 font-extrabold text-3xl">
          <div className="mx-1">Na dzisiaj</div>
          <div className="mx-6">Magazyn</div>
        </div>

        <div className="h-[calc(100vh-420px)] grid grid-cols-2 gap-12 mx-11">
          <Today />
          <Storage />
        </div>
      </div>
    </div>
  );
}
