import { motion } from "framer-motion";

const MegaMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="absolute top-full left-0 w-full shadow border-t border-light-green z-40  h-fit bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default MegaMenu;
