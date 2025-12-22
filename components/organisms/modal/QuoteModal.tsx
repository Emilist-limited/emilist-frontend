import { useEffect } from "react";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Textarea from "@/components/atoms/Textarea";
import UnEditableInput from "@/components/atoms/UnEditableInput";

import { QuoteModalProps } from "@/features/jobs/types";
import { numberWithCommas } from "@/lib/helpers";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";

const QuoteModal = ({
  isOpen,
  onCancel,
  jobInfo,
  handleChange,
  amount,
  isSubmitting,
  handleSetPercentage,
  handleAchievementChange,
  setMilestones,
  setPercentage,
  percentage,
  milestones,
  handlePercentageBlur,
  setAmount,
  onRespondQuote,
}: QuoteModalProps) => {
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

    const baseAmount = jobInfo?.maximumPrice || jobInfo?.budget || 0;
    setAmount(baseAmount);

    const calculatedPercentage = jobInfo.milestones.map(
      (milestone: any) => (milestone.amount / Number(baseAmount)) * 100
    );
    setPercentage(calculatedPercentage);
  }, [jobInfo?.milestones?.length, jobInfo]);

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <form
        className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 max-h-[80vh] h-[80vh] overflow-y-auto"
        onSubmit={onRespondQuote}
      >
        <h2 className="text-lg font-bold pb-5">Quote</h2>
        <div className="space-y-4">
          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="project_duration">Project duration</Label>
            <UnEditableInput
              title={`${
                jobInfo?.duration?.number && jobInfo?.duration?.number
              } ${jobInfo?.duration?.period && jobInfo?.duration?.period}`}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="total_amount">
              Total amount ({jobInfo?.currency})
            </Label>
            <p className="text-xs text-dark-green text-left">
              Please enter your total amount for this job
            </p>
            <Input
              id="total_amount"
              name="amount"
              value={amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1 space-y-1">
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
                <h2 className="Sm:text-lg font-semibold py-2 text-left">
                  Milestone {index + 1}
                </h2>
                <div className="w-full flex flex-col gap-1">
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
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="description">
                    Details of what is to be achieved
                  </Label>
                  <p className="text-xs text-dark-green text-left">
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
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="percent">Percent for Milestone</Label>
                  <p className="text-xs text-dark-green text-left">
                    Please enter how many percentage (%) from the total amount
                    you're collecting for this milestone.
                  </p>
                  <Input
                    id="percent"
                    name="percent"
                    value={percentage[index]}
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
                <div className="w-full flex flex-col gap-1">
                  <Label
                    htmlFor=""
                    className="text-[#5e625f] py-2 font-medium max-sm:text-sm"
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
            <CustomButton loading={isSubmitting} type="submit">
              Submit Quote
            </CustomButton>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default QuoteModal;
