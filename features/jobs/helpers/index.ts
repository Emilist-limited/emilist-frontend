import { Jobs, Milestone, MilestonePer, PostJobType } from "../types";

export const isAllCompleted = (jobInfo: Jobs) => {
  const isAllMilestoneCompleted = jobInfo?.milestones?.every(
    (milestone: any) => milestone.status === "completed"
  );

  return isAllMilestoneCompleted;
};

export const isAllPaid = (jobInfo: Jobs) => {
  const isAllMilestonePaid = jobInfo?.milestones?.every(
    (milestone: any) =>
      milestone.paymentStatus === "paid" ||
      milestone.paymentStatus === "processing"
  );
  return isAllMilestonePaid;
};

export const isAllMilestoneFilled = (milestones: MilestonePer[]) => {
  return milestones.some(
    (milestone) =>
      !milestone.duration ||
      !milestone.durationType ||
      !milestone.details ||
      milestone.amount === 0
  );
};

export const isMilestoneFilled = (milestones: Milestone[]) => {
  return milestones.some(
    (milestone) =>
      !milestone.timeFrame.number ||
      !milestone.timeFrame.period ||
      !milestone.achievement ||
      milestone.amount === 0
  );
};

export const handleErrorCheck = (
  editJob: PostJobType,
  location: string,
  type?: "biddable" | "regular" | "direct"
) => {
  const commonFieldsInvalid =
    !editJob.category ||
    !editJob.service ||
    !editJob.projectTitle ||
    !editJob.description ||
    !editJob.projectDuration ||
    !location ||
    !editJob.expertLevel ||
    !editJob.milestonesnumber;

  // Type-specific budget validation
  let typeSpecificFieldsInvalid = false;

  if (type === "biddable") {
    typeSpecificFieldsInvalid = !editJob.bidRange || !editJob.maximumPrice;
  } else if (type === "direct") {
    // For direct type, check invite and budget
    typeSpecificFieldsInvalid = !editJob.invite || !editJob.budget;
  } else {
    // For regular type (or when type is undefined), only check budget
    typeSpecificFieldsInvalid = !editJob.budget;
  }

  return commonFieldsInvalid || typeSpecificFieldsInvalid;
};

export const handleEditJobErrorCheck = (
  editJob: Jobs,
  type?: "biddable" | "regular" | "direct"
) => {
  const commonFieldsInvalid =
    !editJob.category ||
    !editJob.service ||
    !editJob.title ||
    !editJob.description ||
    !editJob.duration?.number ||
    !editJob.duration?.period ||
    !editJob.location ||
    !editJob.expertLevel ||
    !editJob.currency;

  // Type-specific budget validation
  let typeSpecificFieldsInvalid = false;

  if (type === "biddable") {
    typeSpecificFieldsInvalid = !editJob.bidRange || !editJob.maximumPrice;
  } else {
    // For regular type (or when type is undefined), only check budget
    typeSpecificFieldsInvalid = !editJob.budget;
  }

  return commonFieldsInvalid || typeSpecificFieldsInvalid;
};
