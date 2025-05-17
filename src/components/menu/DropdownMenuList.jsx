export function DropdownMenuList({ items, onLogout }) {
  return (
    <ul>
      {items.map((item, index) => {
        const Icon = item.icon;
        const spacing =
          index === 0 ? "pb-3" : index === items.length - 1 ? "pt-10" : "py-3";

        return (
          <li key={index}>
            {item.action === "logout" ? (
              <button
                onClick={onLogout}
                className={`flex items-center gap-2 ${spacing} w-full text-left`}
              >
                <Icon />
                {item.label}
              </button>
            ) : (
              <a
                href={item.href}
                className={`flex items-center gap-2 ${spacing}`}
              >
                <Icon />
                {item.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
