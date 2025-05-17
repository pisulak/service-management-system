import { CheckIconBox, CrossIconBox } from "../icons/Checkbox";

export default function Protocol({
  company,
  title,
  description,
  mobileNumber,
  underWarranty,
  isRecall,
  address,
  distance,
  date,
}) {
  const isPlanned = Boolean(date);

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
    <div className="grid grid-cols-[8fr_2fr] items-center px-12 py-6 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <h1 className="font-bold text-3xl">{company}</h1>
      <h2 className="my-3 col-span-2 font-bold text-xl">{title}</h2>

      <div className="col-span-2">
        <p className="mx-8 font-extralight">{description}</p>

        <div className="flex items-center">
          <div className="my-2 mr-6">
            Telefon:{" "}
            <span className="underline font-light text-blue-500">
              {mobileNumber}
            </span>
          </div>
          <div className="mx-6">
            {underWarranty ? (
              <CheckIconBox label="Gwarancja" />
            ) : (
              <CrossIconBox label="Gwarancja" />
            )}
          </div>
          <div>
            {isRecall ? (
              <CheckIconBox label="Odwołanie" />
            ) : (
              <CrossIconBox label="Odwołanie" />
            )}
          </div>
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
        <span className="mx-4 mb-0.5 text-sm font-extralight">{distance}</span>
      </div>

      {/* !!! jesli po dacie - brak przycisku !!! */}
      <button
        className="px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl"
        type="button"
      >
        {isPlanned ? "Zamknij zgłoszenie" : "Zaplanuj wizytę"}
      </button>
    </div>
  );
}
