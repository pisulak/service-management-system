import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dashboard,
  Protocol,
  Comming,
  Planned,
  Done,
} from "../../../components/icons/MenuIcons.jsx";
import { ArrowDown, ArrowUp } from "../../../components/icons/ArrowIcons.jsx";

export default function SidebarMenu() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);

  const menuItems = [
    { icon: Dashboard, label: "Panel główny", href: "/clientDashboard" },
    {
      icon: Protocol,
      label: "Zgłoszenia",
      submenu: [
        {
          icon: Comming,
          label: "Wysłane",
          href: "/clientSubmittedProtocols",
        },
        {
          icon: Planned,
          label: "Oczekujące",
          href: "/clientScheduledProtocols",
        },
        { icon: Done, label: "Zrealizowane", href: "/clientClosedProtocols" },
      ],
    },
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
                  <span className="pl-2 select-none hover:underline">
                    {item.label}
                  </span>
                  <div
                    className={`transition-transform duration-300 transform ${
                      openIndex === i ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    {openIndex === i ? <ArrowUp /> : <ArrowDown />}
                  </div>
                </div>
              ) : (
                <div>
                  <a
                    href={item.href}
                    className={`grid grid-cols-[1fr_8fr_1fr] items-center cursor-pointer ${
                      isActive ? "text-blue-500 font-bold" : "text-black"
                    } hover:underline hover:text-blue-700`}
                  >
                    <Icon />
                    <span className="pl-2 select-none">{item.label}</span>
                  </a>
                </div>
              )}

              <AnimatePresence initial={false}>
                {hasSubmenu && openIndex === i && (
                  <motion.ul
                    className="grid justify-items-center ml-4 mt-4 border-l-2 border-gray-300 overflow-hidden"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {item.submenu.map((sub, j) => {
                      const isSubActive = location.pathname.startsWith(
                        sub.href
                      );
                      const IconSub = sub.icon;

                      return (
                        <motion.li
                          key={j}
                          className="w-full my-1.5 pl-3 pr-8"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            delay:
                              openIndex === i
                                ? j * 0.1
                                : Math.abs(0.3 - j * 0.1),
                          }}
                        >
                          <a
                            href={sub.href}
                            className={`grid grid-cols-[1fr_6fr] text-left items-center ${
                              isSubActive
                                ? "text-blue-500 font-bold"
                                : "text-black"
                            } hover:underline hover:text-blue-700`}
                          >
                            <IconSub />
                            <span className="pl-2 select-none">
                              {sub.label}
                            </span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
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
