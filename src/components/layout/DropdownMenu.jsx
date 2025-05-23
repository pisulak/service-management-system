import { motion, AnimatePresence } from "framer-motion";

export function DropdownMenu({ items, onLogout }) {
  return (
    <AnimatePresence>
      <motion.ul
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: {},
          visible: {},
        }}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const spacing =
            index === 0
              ? "pb-3"
              : index === items.length - 1
              ? "pt-10"
              : "py-3";

          return (
            <motion.li
              key={index}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
            >
              {item.action === "logout" ? (
                <button
                  onClick={onLogout}
                  className={`flex items-center gap-2 ${spacing} w-full text-left hover:underline hover:text-blue-700`}
                >
                  <Icon />
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center gap-2 ${spacing} hover:underline hover:text-blue-700`}
                >
                  <Icon />
                  {item.label}
                </a>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </AnimatePresence>
  );
}
