"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ApplyBiddableJobModalProps } from "@/features/jobs/types";
import { numberWithCommas } from "@/lib/helpers";
import { ROUTES } from "@/lib/constants/routes";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";

import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import UnEditableInput from "@/components/atoms/UnEditableInput";
import Textarea from "@/components/atoms/Textarea";
import CustomButton from "@/components/atoms/CustomButton";

const ApplyBiddableJobModal = ({
  isOpen,
  onCancel,
  onApplyJob,
  bidLoading,
  setMaxPrice,
  maxPrice,
  handleSetPercentage,
  handleAchievementChange,
  setMilestones,
  setPercentage,
  percentage,
  milestones,
  jobInfo,
  handleChange,
  handlePercentageBlur,
}: ApplyBiddableJobModalProps) => {
  const { currentUser } = useContext(AuthContext);
  const [service, setService] = useState("");

  useEffect(() => {
    if (jobInfo?.milestones?.length > 0) {
      setMilestones(
        jobInfo?.milestones?.map((milestone: any) => ({
          milestoneId: milestone._id,
          achievement: milestone.achievement,
          amount: milestone.amount,
        }))
      );
    }

    if (jobInfo?.maximumPrice) {
      setMaxPrice(jobInfo?.maximumPrice);
    }
    if (jobInfo?.milestones?.length > 0 && jobInfo?.maximumPrice && isOpen) {
      const calculatedPercentage = jobInfo?.milestones.map(
        (milestone: any) =>
          (milestone.amount / Number(jobInfo?.maximumPrice)) * 100
      );
      setPercentage(calculatedPercentage);
    }
  }, [jobInfo?.milestones?.length]);

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <form
        className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 max-h-[80vh] h-[80vh] overflow-y-auto"
        onSubmit={(e) => onApplyJob(e, jobInfo?._id, service)}
      >
        <h2 className="text-lg font-bold pb-5">Job Application</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="service">
              Select business you want to apply with
            </Label>
            <div className="expert-reg-input-div">
              <select
                className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1"
                id="service"
                name="service"
                value={service}
                style={{ fontSize: "16px" }}
                onChange={(e) => setService(e.target.value)}
              >
                {currentUser?.businesses?.length > 0 ? (
                  <option defaultValue="">Select business</option>
                ) : (
                  <option defaultValue="">No business registered</option>
                )}
                {currentUser?.businesses?.map(
                  (business: any, index: number) => (
                    <option key={index} value={business?._id}>
                      {business?.businessName}
                    </option>
                  )
                )}
              </select>
            </div>
            <Link href={ROUTES?.JOIN_EXPERT} className="flex-c gap-1">
              <Image
                src="/icons/add.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
              />
              <span className="text-primary-green max-sm:text-sm">
                Add New Business
              </span>
            </Link>
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="project_duration">Project duration</Label>
            <UnEditableInput
              title={`${
                jobInfo?.duration?.number && jobInfo?.duration?.number
              } ${jobInfo?.duration?.period && jobInfo?.duration?.period}`}
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="total_amount">
              Total amount ({jobInfo?.currency})
            </Label>
            <p className="text-xs text-dark-green">
              Please enter your total amount for this job
            </p>
            <Input
              id="total_amount"
              name="maxPrice"
              value={maxPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="Milestone">Milestone</Label>
            <UnEditableInput
              title={`${
                jobInfo?.milestones?.length && jobInfo?.milestones?.length
              }`}
            />
          </div>

          {jobInfo?.milestones?.map((mileStone: any, index: number) => {
            return (
              <div key={index} className="space-y-4">
                <h2 className="Sm:text-lg font-semibold py-2">
                  Milestone {index + 1}
                </h2>
                <div className="w-full space-y-1">
                  <Label htmlFor="milestone_duration">Milestone duration</Label>
                  <UnEditableInput
                    title={`${
                      mileStone?.timeFrame?.number &&
                      mileStone?.timeFrame?.number
                    } ${
                      mileStone?.timeFrame?.period &&
                      mileStone?.timeFrame?.period
                    }`}
                  />
                </div>
                <div className="w-full space-y-1">
                  <Label htmlFor="description">
                    Details of what is to be achieved
                  </Label>
                  <p className="text-xs text-dark-green">
                    Please type in what you intend to achieve on each milestone.
                  </p>
                  <Textarea
                    rows={4}
                    name="description"
                    value={milestones[index]?.achievement}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="w-full space-y-1">
                  <Label htmlFor="percent">Percent for Milestone</Label>
                  <p className="text-xs text-dark-green">
                    Please enter how many percentage (%) from the total amount
                    you're collecting for this milestone.
                  </p>
                  <Input
                    id="percent"
                    name="percent"
                    value={percentage[index] || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      handleSetPercentage(
                        index,
                        formatInputTextNumber(newValue)
                      );
                    }}
                    onBlur={handlePercentageBlur}
                    required
                  />
                </div>
                <div className="w-full space-y-1">
                  <Label
                    htmlFor=""
                    className="text-[#5e625f] py-2 font-[500] max-sm:text-sm"
                  >
                    Amount ({jobInfo?.currency})
                  </Label>
                  <UnEditableInput
                    title={`${
                      milestones[index]?.amount
                        ? numberWithCommas(milestones[index]?.amount)
                        : 0
                    }`}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex gap-2 justify-center mt-5">
            <CustomButton loading={bidLoading} type="submit">
              Submit application
            </CustomButton>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default ApplyBiddableJobModal;
