import {
  Protocol,
  Warranty,
  PhoneIcon,
  Device,
} from "../../../components/icons/ProtocolIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";
import { getDiffDays } from "../../../utils/getDiffDays.js";

export default function ProtocolItem({
  id,
  ticketNumber,
  type,
  company,
  hasDevice,
  deviceName,
  title,
  description,
  mobileNumber,
  underWarranty,
  parentTicket,
  address,
  nip,
  priority,
  date,
}) {
  const isPlanned = Boolean(date);
  const diffDays = getDiffDays(date);
  const typeText = type === "awaria" ? "Awaria" : "Montaż";
  const priorityIcon =
    priority === "Wysoki" ? (
      <High className="text-orange-700" />
    ) : priority === "Standardowy" ? (
      <Medium className="text-amber-400" />
    ) : (
      <Low className="text-lime-600" />
    );

  const getDateColor = () => {
    if (typeof diffDays !== "number") return;
    if (diffDays < 0) return "text-gray-400";
    if (diffDays === 0) return "text-red-500";
    if (diffDays <= 3) return "text-yellow-500";
    return "text-green-500";
  };

  const dateColor = getDateColor();

  return (
    <div className="grid grid-cols-[8fr_2fr] items-center px-12 py-6 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <h1 className="flex items-center gap-3 font-bold text-2xl">
        {company}{" "}
        <span className="relative group">
          {priorityIcon}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded bg-opacity-60 bg-gray-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Priorytet: {priority}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-opacity-60 border-t-gray-500" />
          </div>
        </span>
      </h1>
      <h1 className="text-right font-bold text-2xl text-stone-500">
        {ticketNumber}
      </h1>
      <h2 className="my-3 col-span-2 font-bold text-xl">
        {typeText}: {title}
      </h2>
      <div className="col-span-2">
        <p className="mx-8 mb-6 font-light">{description}</p>
        <div className="mb-6">
          {hasDevice && (
            <div className="flex gap-2">
              <Device />
              Urządzenie: <span className="font-bold">{deviceName}</span>
            </div>
          )}
        </div>

        <div className="flex gap-12 items-center mb-4">
          {underWarranty ? (
            <div className="flex gap-2">
              <Warranty />
              Gwarancja
            </div>
          ) : null}
          <div>
            {!!parentTicket ? (
              <div className="flex gap-2 hover:text-blue-700 underline">
                <Protocol />
                <a href="#">Powiązane zgłoszenie: {parentTicket}</a>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex gap-2 my-2 mr-6">
          <PhoneIcon />
          Telefon:{" "}
          <span className="underline font-bold text-blue-500">
            {mobileNumber}
          </span>
        </div>
      </div>

      <div className="flex items-end text-xl">
        <div
          className={`${
            isPlanned ? "mr-6" : "mr-0"
          } font-semibold ${dateColor}`}
        >
          {date}
        </div>
        {address}
        <span className="mx-4 mb-0.5 text-sm font-extralight">distance</span>
      </div>

      <button
        className="px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
        type="button"
      >
        {(() => {
          if (!date) return "Zaplanuj wizytę";
          if (diffDays < 0) return "Podgląd protokołu";
          return "Zamknij zgłoszenie";
        })()}
      </button>
    </div>
  );
}
