import BlackListButton from "@/components/atoms/BlackListButton";
import FavoriteButton from "@/components/atoms/FavouriteButton";
import ShareButton from "@/components/atoms/ShareButton";
import UserIcon from "@/components/atoms/UserIcon";

import { numberWithCommas } from "@/lib/helpers";
import { Application } from "../types";

interface JobCardFooterProps {
  jobApplications?: [] | Application[];
  onOpenShareModal: () => void;
  onSaveJob: (id: string) => void;
  onUnSaveJob: (id: string) => void;
  onBlacklistJob?: (id: string) => void;
  jobId: string;
  isJobLiked: boolean;
}

const JobCardFooter = ({
  jobApplications,
  onOpenShareModal,
  onBlacklistJob,
  onSaveJob,
  onUnSaveJob,
  jobId,
  isJobLiked,
}: JobCardFooterProps) => {
  return (
    <div className="flex-c-b text-[#737774] font-medium text-sm pt-4">
      <div className="flex-c gap-4 flex-wrap max-sm:hidden">
        <div className="flex-c justify-end gap-1  ">
          <UserIcon className="size-5" />
          <p className=" whitespace-nowrap ">
            {numberWithCommas(jobApplications?.length || 0)} Applicant
            {jobApplications?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <ShareButton handleOpen={onOpenShareModal} type="job" show={true} />
      </div>
      <div className="flex-c justify-end gap-10 max-sm:gap-4 ">
        <FavoriteButton
          liked={isJobLiked}
          onSave={() => onSaveJob(jobId)}
          onUnsave={() => onUnSaveJob(jobId)}
        />
        {onBlacklistJob && (
          <BlackListButton
            type="job"
            show={false}
            handleBlacklist={() => onBlacklistJob(jobId)}
          />
        )}
      </div>
    </div>
  );
};

export default JobCardFooter;
