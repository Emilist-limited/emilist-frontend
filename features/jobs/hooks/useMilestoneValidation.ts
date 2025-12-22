import { MilestonePer } from "../types";

export const useMilestoneValidation = () => {
  const normalizeDurationType = (durationType: string): string => {
    const normalized = durationType.toLowerCase();
    if (normalized === "day" || normalized === "days") return "day";
    if (normalized === "week" || normalized === "weeks") return "week";
    if (normalized === "month" || normalized === "months") return "month";
    return normalized;
  };

  const validateMilestoneDuration = (
    projectDuration: { durationNumber: string; durationType: string },
    milestones: MilestonePer[]
  ): boolean => {
    const overallProjectDuration = Number(projectDuration?.durationNumber);
    let projectDurationDays: number;

    const normalizedProjectDurationType = normalizeDurationType(
      projectDuration.durationType
    );

    switch (normalizedProjectDurationType) {
      case "day":
        projectDurationDays = overallProjectDuration;
        break;
      case "week":
        projectDurationDays = overallProjectDuration * 7;
        break;
      case "month":
        projectDurationDays = overallProjectDuration * 30;
        break;
      default:
        throw new Error("Invalid project duration type");
    }

    let totalMilestoneDurationDays = 0;
    for (const milestone of milestones) {
      const milestoneDuration = Number(milestone?.duration);
      const normalizedMilestoneDurationType = normalizeDurationType(
        milestone.durationType
      );

      switch (normalizedMilestoneDurationType) {
        case "day":
          totalMilestoneDurationDays += milestoneDuration;
          break;
        case "week":
          totalMilestoneDurationDays += milestoneDuration * 7;
          break;
        case "month":
          totalMilestoneDurationDays += milestoneDuration * 30;
          break;
        default:
          throw new Error("Invalid milestone duration type");
      }
    }
    return totalMilestoneDurationDays === projectDurationDays;
  };

  return { validateMilestoneDuration };
};
