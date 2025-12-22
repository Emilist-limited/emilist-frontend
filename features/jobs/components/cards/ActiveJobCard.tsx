import Link from "next/link";

import { Jobs } from "../../types";
import { ROUTES } from "@/lib/constants/routes";
import { formatDueDate, formatStartDate } from "@/lib/helpers/dates";

const ActiveJobCard = ({ job }: { job: Jobs }) => {
  return (
    <Link
      href={
        job?.type === "biddable"
          ? ROUTES?.ACTIVE_BIDDABLE_JOB_INFO(job._id)
          : job?.type === "regular"
          ? ROUTES?.ACTIVE_REGULAR_JOB_INFO(job._id)
          : ROUTES?.ACTIVE_DIRECT_JOB_INFO(job._id)
      }
      className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b hover:border-primary-green transition-all duration-300"
    >
      <div className="flex ">
        <h6 className="sm:text-xl font-semibold">{job?.title && job?.title}</h6>
      </div>
      <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
        <div className="flex flex-col gap-2 max-sm:hidden">
          <p className="text-[#5E625F] sm:text-sm font-medium text-xs whitespace-nowrap">
            Milestone
          </p>
          <h6 className="font-bold max-sm:text-sm whitespace-nowrap">
            {job?.milestoneProgress && job?.milestoneProgress}
          </h6>
        </div>
        <div className="flex flex-col gap-2 max-md:hidden">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Start Date
          </p>
          <h6 className="font-bold  max-sm:text-sm whitespace-nowrap">
            {job?.startDate && formatStartDate(job?.startDate)}
          </h6>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Due date
          </p>
          <div className=" flex-c justify-center bg-[#F0FDF5] h-[30px] max-sm:h-[25px]  rounded-[20px]">
            <p className="text-[#25C269]  sm:text-sm font-medium text-xs whitespace-nowrap px-4">
              {job?.currentMilestoneDueDate &&
                formatDueDate(job?.currentMilestoneDueDate)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-sm:hidden">
          <p className="text-[#5E625F]  text-[14px] font-[500]  max-sm:text-[12px] whitespace-nowrap">
            Job Due date
          </p>
          <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
            <p className="text-[#25C269]  text-sm font-medium  max-sm:text-xs whitespace-nowrap">
              {job?.overallDueDate && formatDueDate(job?.overallDueDate)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActiveJobCard;
