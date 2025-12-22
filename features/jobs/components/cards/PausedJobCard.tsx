import Link from "next/link";
import Image from "next/image";

import { Jobs } from "../../types";

const PausedJobCard = ({ job, href }: { job: Jobs; href: string }) => {
  return (
    <div className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b max-md:flex-col gap-4 max-md:justify-start max-md:items-start">
      <div className="flex ">
        <Link
          href={href}
          className="sm:text-xl font-semibold hover:text-primary-green transition-all duration-300"
        >
          {job?.title && job?.title}
        </Link>
      </div>
      <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-[#5E625F]  sm:text-sm font-medium max-sm:text-xs whitespace-nowrap">
            Milestone
          </p>
          <h6 className="font-bold max-sm:text-sm  whitespace-nowrap">
            {job?.milestoneProgress && job?.milestoneProgress}
          </h6>
        </div>

        <div className="flex-c flex-col gap-2">
          <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
            Paused
          </p>
          <div className=" flex-c justify-center bg-[#FFF5EB] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-xl">
            <Image
              src="/icons/pause.svg"
              alt="menu"
              width={20}
              height={24}
              className="object-contain sm:w-6 sm:h-6 w-5 h-5"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className=" flex-c justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-xl">
            <p className="text-primary-green  text-xs font-medium whitespace-nowrap">
              Activate
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PausedJobCard;
