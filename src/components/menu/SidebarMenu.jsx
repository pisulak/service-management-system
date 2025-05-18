import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Dashboard,
  Protocol,
  Comming,
  Planned,
  Done,
  Storage,
  Clients,
} from "../icons/MenuIcons";
import { ArrowDown, ArrowUp } from "../icons/ArrowIcons";

export default function SidebarMenu() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);

  const menuItems = [
    { icon: Dashboard, label: "Panel główny", href: "/dashboard" },
    {
      icon: Protocol,
      label: "Zgłoszenia",
      submenu: [
        { icon: Comming, label: "Przychodzące", href: "/ticketsIncoming" },
        { icon: Planned, label: "Zaplanowane", href: "/ticketsPlanned" },
        { icon: Done, label: "Zakończone", href: "/ticketsDone" },
      ],
    },
    { icon: Storage, label: "Magazyn", href: "/storage" },
    { icon: Clients, label: "Klienci", href: "#" },
  ];

  useEffect(() => {
    menuItems.forEach((item, index) => {
      if (item.submenu) {
        const hasActiveSub = item.submenu.some((sub) =>
          location.pathname.startsWith(sub.href)
        );
        if (hasActiveSub) {
          setOpenIndex(index);
        }
      }
    });
  }, [location.pathname]);

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-rows-[1fr_9fr_1fr] min-w-72 h-full bg-white p-8 shadow-[5px_0px_20px_0px_rgba(0,0,0,0.2)]">
      <img className="justify-self-center" src="" alt="logo serwisu" />

      <ul>
        {menuItems.map((item, i) => {
          const isActive = location.pathname.startsWith(item.href || "");
          const Icon = item.icon;
          const hasSubmenu = !!item.submenu;

          return (
            <li className="mt-6" key={i}>
              {hasSubmenu ? (
                <div
                  onClick={() => toggleSubmenu(i)}
                  className="grid grid-cols-[1fr_8fr_1fr] items-center cursor-pointer"
                >
                  <Icon />
                  <span className="pl-2 select-none">{item.label}</span>
                  {openIndex === i ? <ArrowUp /> : <ArrowDown />}
                </div>
              ) : (
                <div>
                  <a
                    href={item.href}
                    className={`grid grid-cols-[1fr_8fr_1fr] items-center cursor-pointer ${
                      isActive ? "text-blue-500 font-bold" : "text-black"
                    }`}
                  >
                    <Icon />
                    <span className="pl-2 select-none">{item.label}</span>
                  </a>
                </div>
              )}

              {hasSubmenu && openIndex === i && (
                <ul className="grid justify-items-center ml-4 my-4 border-l-2 border-gray-300">
                  {item.submenu.map((sub, j) => {
                    const isSubActive = location.pathname.startsWith(sub.href);
                    const IconSub = sub.icon;

                    return (
                      <li key={j} className="w-full my-1.5 pl-3 pr-8">
                        <a
                          href={sub.href}
                          className={`grid grid-cols-[1fr_6fr] text-left items-center ${
                            isSubActive
                              ? "text-blue-500 font-bold"
                              : "text-black"
                          }`}
                        >
                          <IconSub />
                          <span className="pl-2 select-none">{sub.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div className="justify-self-center content-end font-extralight select-none">
        Copyright 2025
      </div>
    </div>
  );
}
