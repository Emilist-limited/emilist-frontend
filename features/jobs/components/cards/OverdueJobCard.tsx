import Link from "next/link";

import { Jobs } from "../../types";
import { formatOverDueDate } from "@/lib/helpers/dates";

const OverdueJobCard = ({ job, href }: { job: Jobs; href: string }) => {
  return (
    <Link
      href={href}
      className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b max-md:flex-col gap-4 max-md:justify-start max-md:items-start"
    >
      <div className="flex ">
        <h6 className="sm:text-xl font-semibold">{job?.title && job?.title}</h6>
      </div>
      <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Milestone
          </p>
          <h6 className="font-bold  max-sm:text-sm  whitespace-nowrap">
            {job?.milestoneProgress && job?.milestoneProgress}
          </h6>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Due date
          </p>
          <div className=" flex items-center justify-center bg-[#FFF1F2] w-fit px-2 py-1 max-sm:w-[70px] rounded-2xl ">
            <p className="text-[#FF5D7A]  sm:text-sm font-medium text-xs whitespace-nowrap">
              {job?.overallDueDate && formatOverDueDate(job?.overallDueDate)}{" "}
              ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OverdueJobCard;
