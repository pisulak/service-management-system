import {
  FileCog,
  ShieldCheck,
  Phone,
  MonitorCog,
  CalendarPlus,
  Plus,
  Trash2,
} from "lucide-react";

export function Protocol() {
  return <FileCog />;
}

export function Warranty() {
  return <ShieldCheck />;
}

export const PhoneIcon = (props) => <Phone {...props} />;

export const Device = (props) => <MonitorCog {...props} />;

export const Calendar = (props) => <CalendarPlus {...props} />;

export const Add = (props) => <Plus {...props} />;

export const Delete = (props) => <Trash2 {...props} />;
