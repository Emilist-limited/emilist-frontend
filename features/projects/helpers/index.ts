import { Application, Jobs } from "@/features/jobs/types";

export const showQuoteComponent = (
  jobInfo: Jobs,
  currentUserId: string
): boolean => {
  return (
    jobInfo?.isRequestForQuote &&
    jobInfo?.applications?.some(
      (applicant: Application) => applicant?.user?._id === currentUserId
    )
  );
};
