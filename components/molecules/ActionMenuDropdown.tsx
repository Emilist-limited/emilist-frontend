"use client";

import { motion } from "framer-motion";

const ActionMenuDropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-w-fit absolute right-0 top-full z-10 bg-white rounded-lg shadow flex flex-col gap-2 items-start"
    >
      {children}
    </motion.div>
  );
};

export default ActionMenuDropdown;
