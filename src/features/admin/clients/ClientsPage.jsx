import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/AdminSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import ClientList from "./ClientList.jsx";

export default function ClientsView() {
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

      <div className="grid grid-cols-1 grid-rows-[1fr_10fr] justify-items-center w-full">
        <Topbar />

        <div className="w-5/6">
          <div className="mx-6 my-4 font-extrabold text-3xl">Klienci</div>
          <ClientList />
        </div>
      </div>
    </div>
  );
}
