"use client";

import { Milestone } from "../types";

interface ToggleaMilestonesProps {
  currentMilestoneId: string;
  milestones: Milestone[];
  setCurrentMilestone: (milestone: Milestone) => void;
}

const ToggleaMilestones = ({
  milestones,
  currentMilestoneId,
  setCurrentMilestone,
}: ToggleaMilestonesProps) => {
  return (
    <ul className="flex items-center flex-wrap gap-4   px-10 max-sm:px-5">
      {milestones?.map((milestoneInfo: Milestone, i: number) => (
        <li
          key={i}
          className={`${
            milestoneInfo._id === currentMilestoneId
              ? "text-primary-green  border-b-primary-green border-b-2"
              : "text-[#737774]"
          }   font-semibold capitalize cursor-pointer max-sm:text-[14px]`}
          onClick={() => setCurrentMilestone(milestoneInfo)}
        >
          Milestone {i + 1}
        </li>
      ))}
    </ul>
  );
};

export default ToggleaMilestones;
