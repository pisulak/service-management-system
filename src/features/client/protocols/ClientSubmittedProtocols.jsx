import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/ClientSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import Searchbar from "../../../components/common/ProtocolSearchbar.jsx";
import ProtocolsContainer from "./ClientProtocolList.jsx";
import {
  CalArrowDown,
  CalArrowUp,
} from "../../../components/icons/CalendarIcons.jsx";
import { sortProtocolsByDate } from "../../../utils/sortProtocols.js";

export default function ClientSubmittedProtocols() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [protocolsData, setProtocolsData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
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
        date: "",
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
        date: "",
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
        date: "",
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
        date: "",
      },
    ]);
  }, []);

  if (!user) return null;

  const sortedProtocols = sortProtocolsByDate(protocolsData, isAscending);

  const showButton = protocolsData.some((protocol) => {
    const [day, month, year] = protocol.date.split(".");
    const date = new Date(`${year}-${month}-${day}`);
    return !isNaN(date.getTime());
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <div className="grid grid-cols-1 justify-items-center mb-5">
          <div className="px-5 w-5/6">
            <div className="mx-1 my-4 font-extrabold text-3xl">
              Wysłane zgłoszenia
            </div>
            <div className="grid grid-cols-[5fr_1fr]">
              <Searchbar value={searchTerm} onChange={setSearchTerm} />
              {showButton && (
                <button
                  onClick={() => setIsAscending((prev) => !prev)}
                  className="mx-2 justify-self-end"
                >
                  {isAscending ? <CalArrowUp /> : <CalArrowDown />}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-center h-[calc(100vh-200px)]">
          <ProtocolsContainer
            searchTerm={searchTerm}
            protocolsData={sortedProtocols}
          />
        </div>
      </div>
    </div>
  );
}
