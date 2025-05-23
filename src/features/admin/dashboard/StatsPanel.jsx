import StatItem from "../../../components/common/StatItem";

export default function StatsPanel() {
  const statsData = [
    {
      title: "Ilość klientów",
      value: "54",
      change: "+13,245%",
      isPositive: true,
      imgSrc: "",
    },
    {
      title: "Ilość zgłoszeń",
      value: "485",
      change: "-5,627%",
      isPositive: false,
      imgSrc: "",
    },
    {
      title: "Przejechane km",
      value: "4648",
      change: "+1,985%",
      isPositive: true,
      imgSrc: "",
    },
  ];

  return (
    <div className="mx-16">
      <div className="mx-1 my-4 font-extrabold text-3xl">Statystyki</div>
      <div className="grid grid-cols-3 gap-20">
        {statsData.map((item, index) => (
          <StatItem
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
            isPositive={item.isPositive}
            imgSrc={item.imgSrc}
          />
        ))}
      </div>
    </div>
  );
}
