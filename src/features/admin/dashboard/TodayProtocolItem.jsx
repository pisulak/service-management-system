import {
  Protocol,
  Warranty,
  PhoneIcon,
  Device,
} from "../../../components/icons/ProtocolIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";

export default function TodayProtocolItem({
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
  const typeText = type === "awaria" ? "Awaria" : "Montaż";
  const priorityIcon =
    priority === "Wysoki" ? (
      <High className="text-orange-600" />
    ) : priority === "Standardowy" ? (
      <Medium className="text-green-600" />
    ) : (
      <Low className="text-gray-300" />
    );

  const getDateColor = () => {
    if (!date) return;
    const today = new Date();
    const [day, month, year] = date.split(".").map(Number);
    const protocolDate = new Date(year, month - 1, day);

    const diffTime = protocolDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-gray-400";
    if (diffDays === 0) return "text-red-500";
    if (diffDays <= 3) return "text-yellow-500";
    return "text-green-500";
  };

  const dateColor = getDateColor();

  return (
    <div className="grid grid-cols-[8fr_5fr] items-center px-6 py-4 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <h1 className="font-bold text-2xl text-gray-400">{ticketNumber}</h1>
      <div className={`font-semibold text-right ${dateColor}`}>{date}</div>
      <h1 className="flex items-center gap-3 col-span-2 mt-4 font-bold text-2xl">
        {company} {priorityIcon}
      </h1>
      <h2 className="mb-4 col-span-2 font-bold text-xl">
        {typeText}: {title}
      </h2>
      <div className="col-span-2 mx-4">
        <p className="mb-2 font-light">{description}</p>
        {hasDevice && (
          <div className="flex gap-2">
            <Device />
            Urządzenie: <span className="font-bold">{deviceName}</span>
          </div>
        )}
        <div className="flex gap-2 mt-2 mb-1.5">
          <PhoneIcon />
          Telefon:{" "}
          <span className="underline font-bold text-blue-500">
            {mobileNumber}
          </span>
        </div>
        <div className="mt-4 mb-2">
          {underWarranty ? (
            <div className="flex gap-2">
              <Warranty />
              Gwarancja
            </div>
          ) : null}
        </div>
        <div>
          {!!parentTicket ? (
            <div className="flex gap-2 hover:text-blue-700 underline">
              <Protocol />
              <a href="#">Powiązane zgłoszenie: {parentTicket}</a>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-3">
        {address}
        <span className="mx-4 font-extralight">distance</span>
      </div>
      <button
        className="mt-3 px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
        type="button"
      >
        {isPlanned ? "Zamknij zgłoszenie" : "Zaplanuj wizytę"}
      </button>
    </div>
  );
}
