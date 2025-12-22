"use client";

import { useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Logo from "../atoms/Logo";

const SidebarLayout = ({
  children,
  toggle,
}: {
  children: React.ReactNode;
  toggle: () => void;
}) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-screen fixed z-50 top-0 left-0 flex bg-part-transparent justify-end overflow-hidden"
      style={{ touchAction: "none" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          toggle();
        }
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          transition={{ duration: 0.4 }}
          className="max-w-96 sm:w-full w-[90%] bg-white h-full flex flex-col"
        >
          {/* Fixed header */}
          <div className="flex-c-b py-6 padding-ctn flex-shrink-0">
            <Logo />
            <button className="block float-end text-2xl" onClick={toggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto padding-ctn">{children}</div>
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  );
};

export default SidebarLayout;
