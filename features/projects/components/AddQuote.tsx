"use client";

import QuoteModal from "@/components/organisms/modal/QuoteModal";

import { useRespondQuote } from "@/features/jobs/hooks/useRespondQuote";
import { Jobs } from "@/features/jobs/types";
import { useCallback } from "react";

const AddQuote = ({
  jobInfo,
  getJobInfo,
}: {
  jobInfo: Jobs;
  getJobInfo: () => void;
}) => {
  const {
    isSubmitting,
    amount,
    setAmount,
    milestones,
    respondQuote,
    handleChange,
    onCancelModal,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleSetPercentage,
    isOpen,
    setIsOpen,
    handlePercentageBlur,
  } = useRespondQuote();

  const onRespondQuote = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      respondQuote(e, jobInfo?._id, () => {
        getJobInfo();
      });
    },
    [jobInfo?._id, getJobInfo]
  );

  return (
    <div className="col-span-12 ">
      <div className="flex-c-b bg-[#DDFBE9] border-primary-green border-1 px-[3rem] py-2 rounded-lg max-sm:flex-col max-md:px-[1rem] max-sm:px-[0.5rem]  gap-2 text-center w-full">
        {" "}
        <p className=" max-sm:text-xs">
          The Job owner requested for a quote
        </p>{" "}
        <button
          className="bg-primary-green px-[18px] py-[5px] text-[#f6fdf9] rounded cursor-pointer whitespace-nowrap max-sm:text-xs"
          onClick={() => setIsOpen(true)}
        >
          Add Quote
        </button>
        {/* quote modal */}
        <QuoteModal
          isOpen={isOpen}
          onCancel={onCancelModal}
          jobInfo={jobInfo}
          isSubmitting={isSubmitting}
          handleAchievementChange={handleAchievementChange}
          handleChange={handleChange}
          handlePercentageBlur={handlePercentageBlur}
          handleSetPercentage={handleSetPercentage}
          amount={amount}
          setAmount={setAmount}
          percentage={percentage}
          setPercentage={setPercentage}
          setMilestones={setMilestones}
          milestones={milestones}
          onRespondQuote={onRespondQuote}
        />
      </div>
    </div>
  );
};

export default AddQuote;
