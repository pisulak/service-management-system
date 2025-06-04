import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

export function generateProtocolPDF(protocol) {
  const docDefinition = {
    content: [
      { text: `Protokół nr: ${protocol.ticket_number}`, style: "header" },
      { text: `Firma: ${protocol.company_name}`, margin: [0, 10] },
      { text: `Tytuł: ${protocol.title}`, margin: [0, 0, 0, 10] },
      { text: `Opis: ${protocol.description}`, margin: [0, 0, 0, 10] },
      protocol.device_name && {
        text: `Urządzenie: ${protocol.device_name}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Telefon: ${protocol.phone_number}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Adres: ${protocol.address}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `NIP: ${protocol.nip}`,
        margin: [0, 0, 0, 10],
      },
      protocol.work_sessions?.length > 0 && {
        text: "Sesje robocze:",
        style: "subheader",
        margin: [0, 20, 0, 10],
      },
      ...(protocol.work_sessions || []).map((ws) => ({
        text: `• ${ws.work_date} ${ws.start_time}–${ws.end_time} (${Math.floor(
          ws.duration / 60
        )}h ${ws.duration % 60}min)`,
        margin: [0, 0, 0, 5],
      })),
      protocol.used_parts?.length > 0 && {
        text: "Zużyte części:",
        style: "subheader",
        margin: [0, 20, 0, 10],
      },
      ...(protocol.used_parts || []).map((part) => ({
        text: `• ${part.quantity_used} x ${part.product} ${
          part.price != null
            ? `(cena: ${part.quantity_used} x ${(part.price / 100).toFixed(
                2
              )} zł szt.) Suma: ${(
                (part.quantity_used * part.price) /
                100
              ).toFixed(2)}`
            : ""
        }`,
        margin: [0, 0, 0, 5],
      })),
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true },
    },
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Protokol_${protocol.ticket_number}.pdf`);
}
