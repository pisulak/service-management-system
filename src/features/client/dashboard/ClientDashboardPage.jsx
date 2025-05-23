import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/ClientSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import StatsPanel from "./ClientStatsPanel.jsx";
import TodayProtocols from "./ClientTodayProtocols.jsx";
import { FilePlus } from "../../../components/icons/AddProtocolIcon.jsx";

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

        <div className="grid grid-cols-[3fr_1fr] gap-12 h-[calc(100vh-420px)] gap-12 mx-11">
          <TodayProtocols />

          <div className="relative group justify-self-end self-end mx-10">
            <button className="p-5 bg-white cursor-pointer text-gray-600 border border-gray-600 rounded-xl hover:bg-gray-200 hover:text-gray-900 hover:border-gray-900 hover:duration-300">
              <FilePlus />
            </button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Zgłoś awarię
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
