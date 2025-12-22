"use client";

import { useState } from "react";

import Tooltip from "./Tooltip";
import ConfirmModal from "./ConfirmModal";

interface BlackListButtonProps {
  handleBlacklist: () => void;
  type: string;
  show?: boolean;
}

const BlackListButton = ({
  handleBlacklist,
  type,
  show = true,
}: BlackListButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="flex-c gap-2 cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        <Tooltip content={`Blacklist ${type}`} position="bottom">
          <span className="text-lg block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="sm:size-6 size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
          </span>
        </Tooltip>
        {show && <span className="sm:text-sm text-xs">Blacklist</span>}
      </button>
      <ConfirmModal
        isOpen={showModal}
        question={`Are you sure you want to blacklist ${type}?`}
        onConfirm={handleBlacklist}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default BlackListButton;
