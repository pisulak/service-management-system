import React from "react";
import Sidebar from "../layout/AdminSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import ClientList from "./ClientList.jsx";

export default function ClientsPage() {
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
