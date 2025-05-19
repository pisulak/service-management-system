import { Company } from "../icons/MenuIcons";
export default function Client({ index, company, date, tickets, priority }) {
  const isEven = index % 2 === 0;
  const Logo = Company;

  return (
    <div
      className={`grid grid-cols-6 gap-3 items-center py-4 px-6 text-black ${
        isEven ? "bg-white" : "bg-gray-200"
      }`}
    >
      <span className="flex items-center col-span-2">
        <span className="mr-2 p-1 border border-gray-400 rounded-full">
          <Logo />
        </span>
        {company}
      </span>
      <span className="">{date}</span>
      <span className="">{tickets}</span>
      <span>{priority}</span>
      <a
        href="#"
        className={`justify-self-end w-fit px-7 py-1 rounded-xl cursor-pointer ${
          isEven ? "bg-blue-200 text-blue-900" : "bg-yellow-100 text-yellow-900"
        }`}
      >
        Zlecenia
      </a>
    </div>
  );
}
