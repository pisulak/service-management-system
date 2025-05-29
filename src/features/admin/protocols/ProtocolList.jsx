import ProtocolItem from "./ProtocolItem";

export default function ProtocolsList({ searchTerm, protocolsData }) {
  const filteredProtocols = protocolsData.filter((item) =>
    `${item.company} ${item.title} ${item.description} ${item.address} ${item.date}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-5/6 h-full overflow-y-auto scroll-smooth">
      <div className="grid grid-cols-1 gap-6 m-5">
        {filteredProtocols.map((item, index) => (
          <ProtocolItem
            key={index}
            id={item.id}
            ticketNumber={item.ticketNumber}
            type={item.type}
            hasDevice={item.hasDevice}
            deviceName={item.deviceName}
            company={item.company}
            title={item.title}
            description={item.description}
            mobileNumber={item.mobileNumber}
            underWarranty={item.underWarranty}
            parentTicket={item.parentTicket}
            address={item.address}
            nip={item.nip}
            priority={item.priority}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
