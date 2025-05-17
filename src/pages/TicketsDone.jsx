import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/menu/SidebarMenu";
import Topbar from "../components/menu/Topbar";
import Searchbar from "../components/ui/Searchbar";
import ProtocolsContainer from "../components/protocol/ProtocolsContainer";
import "../styles/index.css";

export default function TicketsDone() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [protocolsData, setProtocolsData] = useState([]);
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

  useEffect(() => {
    setProtocolsData([
      {
        company: "Tech Solutions",
        title: "Awaria systemu alarmowego",
        description:
          "Klient zgłosił problem z centralą alarmową. Występują fałszywe alarmy.",
        mobileNumber: "+48 501 123 456",
        underWarranty: true,
        isRecall: false,
        address: "Warszawa, ul. Puławska 45",
        distance: "12km",
        date: "2.05.2025",
      },
      {
        company: "Green Energy",
        title: "Przegląd instalacji fotowoltaicznej",
        description:
          "Zgodnie z harmonogramem należy przeprowadzić coroczny przegląd techniczny.",
        mobileNumber: "+48 600 987 123",
        underWarranty: false,
        isRecall: false,
        address: "Kraków, ul. Zielona 7",
        distance: "256km",
        date: "2.05.2025",
      },
      {
        company: "AutoPro",
        title: "Wezwanie serwisowe (recall)",
        description:
          "Naprawa układu hamulcowego zgodnie z kampanią serwisową producenta.",
        mobileNumber: "+48 793 345 678",
        underWarranty: true,
        isRecall: true,
        address: "Poznań, ul. Torowa 19",
        distance: "310km",
        date: "1.05.2025",
      },
      {
        company: "BuildSmart",
        title: "Usterka czujnika CO2",
        description:
          "W biurze klienta czujnik nie wykrywa stężenia dwutlenku węgla.",
        mobileNumber: "+48 512 223 111",
        underWarranty: true,
        isRecall: false,
        address: "Gdańsk, ul. Nadmorska 3",
        distance: "435km",
        date: "1.05.2025",
      },
      {
        company: "SmartLight",
        title: "Brak zasilania w module LED",
        description:
          "Po instalacji jednego z modułów nie świeci się żadna dioda.",
        mobileNumber: "+48 700 555 333",
        underWarranty: false,
        isRecall: false,
        address: "Łódź, ul. Elektryczna 1",
        distance: "180km",
        date: "2.05.2025",
      },
      {
        company: "HydroMax",
        title: "Wyciek z zaworu głównego",
        description:
          "Zawór główny przepuszcza wodę pod ciśnieniem – wymagana wymiana.",
        mobileNumber: "+48 666 222 999",
        underWarranty: true,
        isRecall: false,
        address: "Lublin, ul. Wodna 14",
        distance: "90km",
        date: "1.05.2025",
      },
    ]);
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarMenu />

      <div className="w-full">
        <Topbar />

        <div className="grid grid-cols-1 justify-items-center mb-5">
          <div className="px-5 w-5/6">
            <div className="mx-1 my-4 font-extrabold text-3xl">Zakończone</div>
            <Searchbar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-center h-[calc(100vh-200px)]">
          <ProtocolsContainer
            searchTerm={searchTerm}
            protocolsData={protocolsData}
          />
        </div>
      </div>
    </div>
  );
}
