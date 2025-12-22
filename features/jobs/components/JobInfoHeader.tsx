"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

import { AnimatePresence } from "framer-motion";

import { Capitalize } from "@/lib/helpers";

import StatusBubble from "@/components/atoms/StatusBubble";
import EllipsisButton from "@/components/atoms/EllipsisButton";
import PromoteInsightWrapper from "./PromoteInsightWrapper";

const ActionMenuDropdown = dynamic(
  () => import("@/components/molecules/ActionMenuDropdown")
);

interface JobInfoHeaderProps {
  status?: string;
  title: string;
  toggleActionButton?: () => void;
  showActionDropdown?: boolean;
  children?: React.ReactNode;
  jobId: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  showPromoteInsight?: boolean;
  border_bottom?: boolean;
  isJobOwner?: boolean;
}

const JobInfoHeader = ({
  status,
  title,
  toggleActionButton,
  showActionDropdown,
  children,
  jobId,
  setIsOpen,
  showPromoteInsight = false,
  border_bottom = false,
  isJobOwner,
}: JobInfoHeaderProps) => {
  const canShowPromoteInsight = showPromoteInsight && setIsOpen;

  return (
    <div
      className={`sm:px-10 px-4 ${
        border_bottom && " border-b-1 border-[#B8B9B8]"
      }`}
    >
      {status && (
        <div className="flex justify-end pb-10">
          <StatusBubble status={status} />
        </div>
      )}
      <div className="w-full pb-4 space-y-1">
        <div className="flex-c-b">
          <h5 className="text-3xl font-semibold max-sm:text-xl">
            {title && Capitalize(title)}
          </h5>
          {toggleActionButton && children && (
            <div className="block relative">
              <EllipsisButton onClick={toggleActionButton} />
              <AnimatePresence>
                {showActionDropdown && (
                  <ActionMenuDropdown>{children}</ActionMenuDropdown>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        {canShowPromoteInsight && isJobOwner && (
          <PromoteInsightWrapper setIsOpen={setIsOpen} />
        )}
        <p className=" max-sm:text-xs ">
          <span className="font-semibold">Job ID:</span>
          <span className="uppercase"> {jobId && jobId}</span>
        </p>
      </div>
    </div>
  );
};

export default JobInfoHeader;
