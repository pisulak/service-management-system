export default function StatItem({ title, value, change, isPositive, imgSrc }) {
  return (
    <div className="grid grid-cols-[8fr_5fr] px-6 py-4 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <p className="col-start-1 font-bold text-2xl">{title}</p>
      <p className="col-start-1 font-bold text-5xl self-end mt-10 mb-4">
        {value}
      </p>

      <img
        className="col-start-2 row-start-1 row-span-2"
        src={imgSrc}
        alt="wykres"
      />

      <div className="col-span-2 content-end font-light">
        <span
          className={`font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>{" "}
        w tym miesiącu
      </div>
    </div>
  );
}
