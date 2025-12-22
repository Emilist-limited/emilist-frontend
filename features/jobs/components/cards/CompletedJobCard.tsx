import Link from "next/link";

import { Jobs } from "../../types";
import { isAllCompleted, isAllPaid } from "../../helpers";

import StatusBubble from "@/components/atoms/StatusBubble";

const CompletedJobCard = ({ job, href }: { job: Jobs; href: string }) => {
  return (
    <Link
      href={href}
      className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b gap-6 hover:border-primary-green transition-all duration-300 overflow-x-auto hide-scrollbar"
    >
      <h6 className="sm:text-xl font-semibold">{job?.title && job?.title}</h6>
      <div className="rounded-lg flex justify-end items-center gap-8 max-sm:gap-3">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#5E625F] sm:text-sm font-medium max-sm:text-xs whitespace-nowrap">
            Task
          </p>
          {isAllCompleted(job) ? (
            <StatusBubble status="completed" title="Completed" />
          ) : (
            <StatusBubble status="overdue" title="Not completed" />
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#5E625F] sm:text-sm font-medium max-sm:text-xs whitespace-nowrap">
            Payment status
          </p>
          {isAllPaid(job) ? (
            <StatusBubble status="completed" title="Paid" />
          ) : (
            <StatusBubble status="overdue" title="Not paid" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#5E625F] sm:text-sm font-medium max-sm:text-xs whitespace-nowrap">
            Contract
          </p>
          {job?.isClosed ? (
            <StatusBubble status="completed" title="Closed" />
          ) : (
            <StatusBubble status="overdue" title="Open" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CompletedJobCard;
