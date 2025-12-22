"use client";

import Link from "next/link";
import { useContext, useState } from "react";

import { Jobs } from "../types";
import { useAddClicks } from "@/lib/hooks/useAddClicks";
import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";

import JobCardHeader from "./JobCardHeader";
import JobAmount from "./JobAmount";
import ReadMore from "@/components/molecules/ReadMore";
import LocationIcon from "@/components/atoms/LocationIcon";
import ShareLink from "@/components/molecules/ShareLink";
import JobCardFooter from "./JobCardFooter";

export interface JobViewCardProps {
  job: Jobs;
  onSaveJob: (id: string) => void;
  onUnSaveJob: (id: string) => void;
  onBlacklistJob?: (id: string) => void;
  shadow?: boolean;
  autoLike?: boolean;
}

const JobViewCard = ({
  onSaveJob,
  onUnSaveJob,
  onBlacklistJob,
  job,
  shadow = true,
  autoLike = false,
}: JobViewCardProps) => {
  const { addClicks } = useAddClicks();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const [openShareModal, setOpenShareModal] = useState(false);

  return (
    <div
      className={`w-full p-4 hover:bg-gray-100 transition-all duration-300 space-y-1 ${
        shadow ? "shadow rounded-2xl" : "border-b-1 border-[#B8B9B8]"
      }`}
    >
      <Link
        href={
          job?.type === "biddable"
            ? ROUTES?.GENERAL_BIDDABLE_JOB_DETAILS(job._id)
            : job?.type === "regular"
            ? ROUTES?.GENERAL_REGULAR_JOB_DETAILS(job._id)
            : ROUTES?.GENERAL_DIRECT_JOB_DETAILS(job._id)
        }
        onClick={() => addClicks("job", job._id, userId || null)}
        className="group space-y-1"
      >
        <JobCardHeader
          title={job?.title}
          amount={job?.budget || job?.maximumPrice || 0}
          jobType={job?.type}
          currency={job?.currency}
        />
        <JobAmount
          createdAt={job.createdAt}
          duration={job?.duration?.number}
          period={job?.duration?.period}
        />
      </Link>
      <ReadMore
        text={job?.description}
        maxLength={300}
        style="font-medium text-sm"
      />
      <p className="flex-c gap-1 whitespace-nowrap text-sm">
        <LocationIcon className="size-5" />
        {job?.location}
      </p>
      <JobCardFooter
        isJobLiked={autoLike || job?.liked}
        onBlacklistJob={onBlacklistJob}
        onSaveJob={onSaveJob}
        onUnSaveJob={onUnSaveJob}
        jobId={job._id}
        jobApplications={job?.applications}
        onOpenShareModal={() => setOpenShareModal(true)}
      />
      <ShareLink
        handleCancel={() => setOpenShareModal(false)}
        isModalOpen={openShareModal}
        link={`https://emilist.com${
          job?.type === "biddable"
            ? ROUTES?.GENERAL_BIDDABLE_JOB_DETAILS(job._id)
            : ROUTES?.GENERAL_REGULAR_JOB_DETAILS(job._id)
        }`}
        title="Share job"
        textToCopy="Check out this job on Emilist"
        id={job._id}
      />
    </div>
  );
};

export default JobViewCard;
