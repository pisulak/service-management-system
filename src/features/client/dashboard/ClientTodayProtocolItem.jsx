import {
  Protocol,
  Warranty,
  PhoneIcon,
  Device,
} from "../../../components/icons/ProtocolIcons";

export default function TodayProtocolItem({
  id,
  ticketNumber,
  type,
  hasDevice,
  deviceName,
  title,
  description,
  underWarranty,
  parentTicket,
  date,
}) {
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
  const typeText = type === "awaria" ? "Awaria" : "Montaż";

  return (
    <div className="grid grid-cols-[8fr_5fr] items-center px-6 py-4 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <h1 className="font-bold text-2xl text-gray-400">{ticketNumber}</h1>
      <div className={`font-semibold text-right ${dateColor}`}>{date}</div>
      <h2 className="my-4 col-span-2 font-bold text-xl">
        {typeText}: {title}
      </h2>
      <div className="col-span-2 mx-4">
        <p className="mb-4 font-light">{description}</p>
        {hasDevice && (
          <div className="flex gap-2">
            <Device />
            Urządzenie: <span className="font-bold">{deviceName}</span>
          </div>
        )}
        <div className="flex gap-2 mt-2 mb-1.5">
          <PhoneIcon />
          Telefon do serwisanta:{" "}
          <span className="underline font-bold text-blue-500">
            +48 664 123 543
          </span>
        </div>
      </div>

      <div className="mx-4 mb-3">
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
      <button
        className="self-end mb-2 px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
        type="button"
      >
        Podgląd zgłoszenia
      </button>
    </div>
  );
}
