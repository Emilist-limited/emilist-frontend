"use client";

import { memo, useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { Capitalize } from "@/lib/helpers";
import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";
import { useMemoizedUser } from "@/features/auth/helpers";

import CustomButton from "@/components/atoms/CustomButton";
import DirectJobActionButtons from "./DirectJobActionButtons";
import SideChatWrapper from "@/features/messages/component/SideChatWrapper";

interface JobActionPanelProps {
  jobInfo: any;
  isApplied?: () => boolean;
  onApplicationWithdrawal?: () => void;
  onApply?: () => void;
  isDirectJob?: boolean;
  onAcceptDirectJob?: () => void;
  onRejectDirectJob?: () => void;
}

const JobActionPanel = memo(
  ({
    isApplied,
    onApplicationWithdrawal,
    onApply,
    jobInfo,
    isDirectJob = false,
    onAcceptDirectJob = () => {},
    onRejectDirectJob = () => {},
  }: JobActionPanelProps) => {
    const { currentUser } = useContext(AuthContext);

    const chatUser = useMemoizedUser(jobInfo?.userId);

    return (
      <div className="w-full border-b-1 border-[#B8B9B8] px-10 max-sm:px-5 py-6 flex flex-col gap-3">
        <h5 className="text-dark-green sm:text-lg font-medium">
          {jobInfo?.category && Capitalize(jobInfo.category)}
        </h5>
        <div className="flex-c-b max-lg:flex-col flex-wrap gap-5">
          <div className="flex-c gap-10  max-sm:gap-5 max-lg:w-full">
            <p className="text-[#5E625F] max-sm:text-xs">
              Posted {jobInfo?.createdAt && formatCreatedAt(jobInfo.createdAt)}
            </p>
            <p className="max-sm:text-xs">
              <span className="font-semibold">Job Type:</span>{" "}
              {jobInfo?.type && jobInfo?.type}
            </p>
          </div>
          {currentUser?._id !== jobInfo?.userId?._id && (
            <div className="flex items-center flex-wrap max-lg:w-full gap-2">
              {jobInfo?.status === "pending" ? (
                <>
                  {isDirectJob ? (
                    <DirectJobActionButtons
                      onAccept={onAcceptDirectJob}
                      onReject={onRejectDirectJob}
                    />
                  ) : (
                    <>
                      {isApplied && isApplied() ? (
                        <button
                          className="bg-[#FF5D7A] px-6 h-11 text-white rounded-lg font-bold whitespace-nowrap sm:min-w-40 min-w-32 flex-c max-sm:text-sm"
                          onClick={onApplicationWithdrawal}
                        >
                          withdraw Application
                        </button>
                      ) : (
                        <CustomButton onClick={onApply}>Apply</CustomButton>
                      )}
                    </>
                  )}
                </>
              ) : null}
              <SideChatWrapper chatUser={chatUser} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default JobActionPanel;
