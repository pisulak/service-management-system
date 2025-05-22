import { useState, useRef } from "react";
import {
  Company,
  Notification,
  Profile,
  UserSettings,
  Logout,
} from "../icons/MenuIcons";
import { useClickOutside } from "../../hooks/useClickOutside";
import { logoutUser } from "../../utils/auth";
import { DropdownMenuList } from "./DropdownMenu.jsx";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const Logo = Company;

  const menuItems = [
    { icon: Notification, label: "Powiadomienia", href: "#" },
    { icon: Profile, label: "Profil", href: "#" },
    { icon: UserSettings, label: "Ustawienia", href: "#" },
    { icon: Logout, label: "Wyloguj", action: "logout" },
  ];

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Błąd podczas wylogowania:", error);
    }
  };

  return (
    <div className="relative flex justify-end items-center w-full h-16 px-10">
      <div
        onClick={() => setIsOpen(!isOpen)}
        ref={dropdownRef}
        className="flex items-center cursor-pointer hover:underline"
      >
        Nazwa Firmy
        <span className="ml-6 p-2 border border-gray-400 rounded-full">
          <Logo />
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full right-10 z-50">
          <div className="px-7 py-6 bg-white shadow-md border rounded-xl">
            <DropdownMenuList items={menuItems} onLogout={handleLogout} />
          </div>
        </div>
      )}
    </div>
  );
}
