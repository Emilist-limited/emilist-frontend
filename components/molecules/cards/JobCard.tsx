import Link from "next/link";

import { JobCardProps } from "@/types";
import { ROUTES } from "@/lib/constants/routes";

import PopularJobTitle from "@/components/atoms/PopularJobTitle";
import PopularJobDescription from "@/components/atoms/PopularJobDescription";
import PopularJobPriceDisplay from "@/components/atoms/PopularJobPriceDisplay";

const JobCard: React.FC<JobCardProps> = ({ job, userId, addClicks }) => {
  const href =
    job.type === "biddable"
      ? ROUTES?.GENERAL_BIDDABLE_JOB_DETAILS(job?._id)
      : ROUTES?.GENERAL_REGULAR_JOB_DETAILS(job?._id);

  return (
    <Link
      href={href}
      className="w-80 min-w-80 py-8 sm:px-6 px-3 border border-gray-200 flex flex-col hover:border-primary-green hover:bg-gray-50 transition-all duration-300 group"
      onClick={() => addClicks("job", job._id, userId)}
    >
      <div className="flex flex-col gap-2">
        <PopularJobTitle title={job?.title} />
        <PopularJobDescription description={job?.description} />
      </div>
      <PopularJobPriceDisplay
        type={job.type}
        currency={job.currency}
        budget={job.budget}
        maximumPrice={job.maximumPrice}
      />
    </Link>
  );
};

export default JobCard;
