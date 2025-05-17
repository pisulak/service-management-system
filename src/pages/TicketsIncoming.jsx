import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/menu/SidebarMenu";
import Topbar from "../components/menu/Topbar";
import "./styles/index.css";

export default function App() {
  return (
    <div className="flex h-screen">
      <SidebarMenu />
      <Topbar />
    </div>
  );
}
