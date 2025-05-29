import { FileCog, ShieldCheck, Phone, PcCase } from "lucide-react";

export function Protocol() {
  return <FileCog />;
}

export function Warranty() {
  return <ShieldCheck />;
}

export const PhoneIcon = (props) => <Phone {...props} />;

export const Device = (props) => <PcCase {...props} />;
