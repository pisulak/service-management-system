import Protocol from "./MiniProtocol";

export default function Today() {
  const todayData = [
    {
      company: "Nazwa firmy",
      title: "Tytuł zgłoszenia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum est in laoreet tincidunt.",
      mobileNumber: "+48 123 123 123",
      underWarranty: true,
      isRecall: false,
      address: "Lublin, słoneczna 11",
      distance: "264km",
      date: "13.05.2025",
    },
    {
      company: "Nazwa firmy",
      title: "Tytuł zgłoszenia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum est in laoreet tincidunt.",
      mobileNumber: "+48 123 123 123",
      underWarranty: false,
      isRecall: true,
      address: "Lublin, słoneczna 11",
      distance: "264km",
      date: "13.05.2025",
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
