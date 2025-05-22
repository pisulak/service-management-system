import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../../components/menu/SidebarMenu";
import Topbar from "../../components/menu/Topbar";
import StatScreen from "../../components/stats/StatScreen";
import Today from "../../components/protocol/Today";

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
      <SidebarMenu />

      <div className="w-full">
        <Topbar />
        <StatScreen />

        <div className="grid grid-cols-2 gap-12 mt-10 mx-16 font-extrabold text-3xl">
          <div className="mx-1">Na dzisiaj</div>
        </div>

        <div className="mx-11">
          <Today />
        </div>
      </div>
    </div>
  );
}
