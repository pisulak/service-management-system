import { CheckIconBox, CrossIconBox } from "../icons/Checkbox";

export default function StatCard({
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
  return (
    <div className="grid grid-cols-[8fr_5fr] items-center px-6 py-4 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <h1 className="font-bold text-3xl">{company}</h1>
      <div className="font-semibold text-right text-red-500">{date}</div>
      <h2 className="my-3 col-span-2 font-bold text-xl">{title}</h2>
      <div className="col-span-2 mx-4">
        <p className="font-extralight">{description}</p>
        <div className="my-2 font-semibold">
          Telefon:{" "}
          <span className="underline text-blue-500">{mobileNumber}</span>
        </div>
        <div className="mb-1">
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
      <div>
        {address}
        <span className="mx-4 font-extralight">{distance}</span>
      </div>
      <button
        className="px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl"
        type="submit"
      >
        Zamknij zgłoszenie
      </button>
    </div>
  );
}
