import Link from "next/link";

import { Jobs } from "@/features/jobs/types";
import { formatDueDate, formatStartDate } from "@/lib/helpers/dates";
import { ROUTES } from "@/lib/constants/routes";

const ActiveProjectCard = ({ project }: { project: Jobs }) => {
  return (
    <Link
      href={
        project?.type === "biddable"
          ? ROUTES?.BIDDABLE_PROJECT_INFO(project._id)
          : project?.type === "regular"
          ? ROUTES?.REGULAR_PROJECT_INFO(project._id)
          : ROUTES?.DIRECT_PROJECT_INFO(project._id)
      }
      className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b hover:border-primary-green transition-all duration-300"
    >
      <div className="flex ">
        <h6 className="sm:text-xl font-semibold">
          {project?.title && project?.title}
        </h6>
      </div>
      <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
        <div className="flex flex-col gap-2 max-sm:hidden">
          <p className="text-[#5E625F] sm:text-sm font-medium text-xs whitespace-nowrap">
            Milestone
          </p>
          <h6 className="font-bold max-sm:text-sm whitespace-nowrap">
            {project?.milestoneProgress && project?.milestoneProgress}
          </h6>
        </div>
        <div className="flex flex-col gap-2 max-md:hidden">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Start Date
          </p>
          <h6 className="font-bold  max-sm:text-sm whitespace-nowrap">
            {project?.startDate && formatStartDate(project?.startDate)}
          </h6>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Due date
          </p>
          <div className=" flex-c justify-center bg-[#F0FDF5] h-[30px] max-sm:h-[25px]  rounded-[20px]">
            <p className="text-[#25C269]  sm:text-sm font-medium text-xs whitespace-nowrap px-4">
              {project?.milestoneDueDate &&
                formatDueDate(project?.milestoneDueDate)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-sm:hidden">
          <p className="text-[#5E625F]  text-[14px] font-[500]  max-sm:text-[12px] whitespace-nowrap">
            Job Due date
          </p>
          <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
            <p className="text-[#25C269]  text-sm font-medium  max-sm:text-xs whitespace-nowrap">
              {project?.overallDueDate &&
                formatDueDate(project?.overallDueDate)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActiveProjectCard;
