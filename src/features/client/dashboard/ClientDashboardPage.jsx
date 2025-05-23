import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/ClientSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import StatsPanel from "./StatsPanel.jsx";
import TodayProtocols from "./TodayProtocols.jsx";

export default function ClientDashboardPage() {
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
        <StatsPanel />

        <div className="grid grid-cols-2 gap-12 mt-10 mx-16 font-extrabold text-3xl">
          <div className="mx-1">Na dzisiaj</div>
        </div>

        <div className="mx-11">
          <TodayProtocols />
        </div>
      </div>
    </div>
  );
}
