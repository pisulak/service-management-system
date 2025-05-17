import {
  LayoutDashboard,
  FileCog,
  FileInput,
  FileClock,
  FileCheck2,
  Warehouse,
  User,
  Building2,
  BellRing,
  UserPen,
  Settings,
  LogOut,
} from "lucide-react";

export function Dashboard() {
  return <LayoutDashboard />;
}

export function Protocol() {
  return <FileCog />;
}

export function Comming() {
  return <FileInput />;
}

export function Planned() {
  return <FileClock />;
}

export function Done() {
  return <FileCheck2 />;
}

export function Storage() {
  return <Warehouse />;
}

export function Clients() {
  return <User />;
}

export function Company() {
  return <Building2 />;
}

export function Notification() {
  return <BellRing />;
}

export function Profile() {
  return <UserPen />;
}

export function UserSettings() {
  return <Settings />;
}

export function Logout() {
  return <LogOut />;
}
