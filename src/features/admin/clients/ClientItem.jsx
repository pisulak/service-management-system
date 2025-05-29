import { Company } from "../../../components/icons/MenuIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";

export default function ClientItem({
  index,
  company,
  date,
  tickets,
  priority,
}) {
  const isEven = index % 2 === 0;
  const Logo = Company;
  const priorityIcon =
    priority === "Wysoki" ? (
      <High className="text-orange-600" />
    ) : priority === "Standardowy" ? (
      <Medium className="text-green-600" />
    ) : (
      <Low className="text-gray-300" />
    );

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
      <span className="flex gap-2">
        {priorityIcon} {priority}
      </span>
      <a
        href="#"
        className={`justify-self-end w-fit px-7 py-1 rounded-xl cursor-pointer hover:duration-300 ${
          isEven
            ? "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
        }`}
      >
        Zlecenia
      </a>
    </div>
  );
}
