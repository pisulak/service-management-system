import ClientProtocolItem from "./ClientProtocolItem.jsx";

export default function ProtocolsContainer({ searchTerm, protocolsData }) {
  const filteredProtocols = protocolsData.filter((item) =>
    `${item.company} ${item.title} ${item.description} ${item.address} ${item.date}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-5/6 h-full overflow-y-auto scroll-smooth">
      <div className="grid grid-cols-1 gap-6 m-5">
        {filteredProtocols.map((item, index) => (
          <ClientProtocolItem
            key={index}
            id={item.id}
            ticketNumber={item.ticketNumber}
            type={item.type}
            hasDevice={item.hasDevice}
            deviceName={item.deviceName}
            title={item.title}
            description={item.description}
            underWarranty={item.underWarranty}
            parentTicket={item.parentTicket}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
