import Link from "next/link";

import { Jobs } from "../../types";
import { ROUTES } from "@/lib/constants/routes";

const NewJobCard = ({ job }: { job: Jobs }) => {
  return (
    <Link
      href={
        job?.type === "biddable"
          ? ROUTES?.GENERAL_BIDDABLE_JOB_DETAILS(job._id)
          : job?.type === "regular"
          ? ROUTES?.GENERAL_REGULAR_JOB_DETAILS(job._id)
          : ROUTES?.GENERAL_DIRECT_JOB_DETAILS(job._id)
      }
      className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b hover:border-primary-green transition-all duration-300"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[#737774]  font-medium max-sm:text-sm">
          Statement of work{" "}
        </p>
        <h6 className="sm:text-xl font-semibold">{job?.title && job?.title}</h6>
        <p className="text-[#737774] max-sm:text-sm">
          Job type:{" "}
          <span className="font-semibold capitalize">{job?.type}</span>
        </p>
      </div>
      <div
        className={` rounded-xl flex-c justify-center h-[34px] max-sm:h-[30px] px-3 ${
          job?.status === "pending" ? "bg-[#ECECEC]" : "bg-[#FFF6E5]"
        }`}
      >
        <p
          className={`  font-semibold max-sm:text-sm whitespace-nowrap ${
            job?.status === "pending" ? "text-[#303632]" : "text-[#FF9933]"
          }`}
        >
          {job?.status && job?.status}
        </p>
      </div>
    </Link>
  );
};

export default NewJobCard;
