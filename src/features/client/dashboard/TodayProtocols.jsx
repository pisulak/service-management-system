import Protocol from "../../../components/common/MiniProtocolItem.jsx";

export default function Today() {
  const todayData = [
    {
      company: "Tech Solutions",
      title: "Awaria systemu alarmowego",
      description:
        "Klient zgłosił problem z centralą alarmową. Występują fałszywe alarmy.",
      mobileNumber: "+48 501 123 456",
      underWarranty: true,
      isRecall: false,
      address: "Warszawa, ul. Puławska 45",
      distance: "12km",
      date: "19.05.2025",
    },
    {
      company: "Green Energy",
      title: "Przegląd instalacji fotowoltaicznej",
      description:
        "Zgodnie z harmonogramem należy przeprowadzić coroczny przegląd techniczny.",
      mobileNumber: "+48 600 987 123",
      underWarranty: false,
      isRecall: false,
      address: "Kraków, ul. Zielona 7",
      distance: "256km",
      date: "19.05.2025",
    },
  ];

  return (
    <div className="overflow-y-auto scroll-smooth">
      <div className="grid grid-cols-1 gap-6 m-5">
        {todayData.map((item, index) => (
          <Protocol
            key={index}
            company={item.company}
            title={item.title}
            description={item.description}
            mobileNumber={item.mobileNumber}
            underWarranty={item.underWarranty}
            isRecall={item.isRecall}
            address={item.address}
            distance={item.distance}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
