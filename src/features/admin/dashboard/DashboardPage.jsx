import React from "react";
import Sidebar from "../layout/AdminSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import StatPanel from "./StatsPanel.jsx";
import TodayProtocols from "./TodayProtocols.jsx";
import StoragePanel from "./StoragePanel.jsx";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="w-full">
        <Topbar />

        <div className="grid grid-cols-2 gap-12 mt-10 mx-16 font-extrabold text-3xl">
          <div className="mx-1">Na dzisiaj</div>
          <div className="mx-6">Magazyn</div>
        </div>

        <div className="h-[calc(100vh-420px)] grid grid-cols-2 gap-12 mx-11">
          <TodayProtocols />
          <StoragePanel />
        </div>
      </div>
    </div>
  );
}
