export default function MiniProductItem({
  index,
  code,
  product,
  price,
  quantity,
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`grid grid-cols-4 items-center py-4 px-6 text-black ${
        isEven ? "bg-white" : "bg-gray-200"
      }`}
    >
      <span className="text-base">{code}</span>
      <span className="text-base truncate overflow-hidden whitespace-nowrap">
        {product}
      </span>
      <span className="text-base text-right">{price} zł</span>
      <span className="text-base text-right">
        <span className={`font-medium ${quantity ? "" : "text-red-500"}`}>
          {quantity} szt.
        </span>
      </span>
    </div>
  );
}
