export default function ProductItem({
  index,
  code,
  product,
  description,
  length,
  width,
  height,
  weight,
  price,
  quantity,
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`grid grid-cols-12 gap-3 items-center py-4 px-6 text-black text-right ${
        isEven ? "bg-white" : "bg-gray-200"
      }`}
    >
      <span className="text-left col-span-2">{code}</span>
      <span className="text-left col-span-2">{product}</span>
      <span className="text-left col-span-2 truncate overflow-hidden whitespace-nowrap">
        {description}
      </span>
      <span>{length} mm</span>
      <span>{width} mm</span>
      <span>{height} mm</span>
      <span>{weight} kg</span>
      <span>{price} zł</span>
      <span className={`${quantity ? "" : "text-red-500"}`}>
        {quantity} szt.
      </span>
    </div>
  );
}
