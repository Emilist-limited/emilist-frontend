import dynamic from "next/dynamic";
import { memo, useCallback } from "react";

import { motion } from "framer-motion";

import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import ActionMenuDropdownButton from "@/components/atoms/ActionMenuDropdownButton";

const ConfirmModal = dynamic(() => import("@/components/atoms/ConfirmModal"));
const BiddableApplicationInfoModal = dynamic(
  () => import("@/components/organisms/modal/BiddableApplicationInfoModal")
);

interface BiddableJobApplicantActionDropdownProps {
  openUserDropdown: boolean;
  index: number;
  applicantIndex: number | null;
  isAnyAccepted: boolean;
  applicant: any;
  getJobInfo: () => Promise<void>;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  onCancel: () => void;
  applicationLength: number;
  jobInfo: any;
}

const JobApplicantActionDropdown = memo(
  ({
    index,
    applicantIndex,
    isAnyAccepted,
    applicant,
    setIsOpen,
    isOpen,
    onCancel,
    applicationLength,
    jobInfo,
    getJobInfo,
    openUserDropdown,
  }: BiddableJobApplicantActionDropdownProps) => {
    const isNotAccepted = !isAnyAccepted;
    const isNotRejected = applicant?.status !== "rejected";
    const shouldShowRejectButton = isNotAccepted && isNotRejected;

    const {
      updateApplicationStatus,
      loadingAccept,
      isApplicationInfoOpen,
      onToggleApplicationInfo,
    } = useUpdateApplicationStatus();

    const onUpdateApplicationStatus = useCallback(
      (applicationId: string, status: string) => {
        updateApplicationStatus(applicationId, status, () => {
          getJobInfo();
        });
      },
      []
    );

    return (
      <>
        {loadingAccept && <WhiteBgLoader />}
        {openUserDropdown && applicantIndex === index && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute right-0 top-full shadow-md rounded-md bg-white flex flex-col gap-2 p-6 max-sm:px-2 py-2 items-start z-10 ${
              applicationLength > 1 && applicationLength - 1 === index
                ? "lg:bottom-full"
                : "lg:top-full"
            }`}
          >
            {jobInfo?.type === "biddable" ? (
              <>
                <ActionMenuDropdownButton
                  title="Applicantion info"
                  onClick={onToggleApplicationInfo}
                />
                <BiddableApplicationInfoModal
                  onCancel={onToggleApplicationInfo}
                  isOpen={isApplicationInfoOpen}
                  updateApplicationStatus={onUpdateApplicationStatus}
                  application={applicant}
                  isAnyAccepted={isAnyAccepted}
                  jobInfo={jobInfo}
                />
              </>
            ) : (
              <>
                {isNotRejected && (
                  <ActionMenuDropdownButton
                    title="Accept applicant"
                    onClick={() => {
                      onUpdateApplicationStatus(applicant?._id, "accepted");
                    }}
                  />
                )}
                {shouldShowRejectButton && (
                  <ActionMenuDropdownButton
                    title="Reject applicant"
                    onClick={() => setIsOpen(true)}
                    className="whitespace-nowrap text-red-500 max-sm:text-sm hover:text-red-600 transition-all"
                  />
                )}
              </>
            )}

            <ConfirmModal
              question={`Are you sure you want to reject ${
                applicant?.user?.firstName && applicant?.user?.lastName
                  ? `${applicant.user.firstName} ${applicant.user.lastName}`
                  : applicant?.user?.userName
              }?`}
              isOpen={isOpen}
              onClose={onCancel}
              onConfirm={() =>
                onUpdateApplicationStatus(applicant?._id, "rejected")
              }
            />
          </motion.div>
        )}
      </>
    );
  }
);

export default JobApplicantActionDropdown;
