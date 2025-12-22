import { ChangeEvent, useState } from "react";

import { PlannedJobType, PostJobType } from "../types";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { useToast } from "@/lib/hooks/useToast";

export const usePostJobState = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [reminderDates, setReminderDates] = useState<number[]>([1]);
  const [projectType, setProjectType] = useState<"biddable" | "regular">(
    "biddable"
  );
  const [plannedJob, setPlannedJob] = useState<PlannedJobType>({
    frequency: "",
    endDate: "",
    startDate: "",
  });

  const [postJob, setPostJob] = useState<PostJobType>({
    invite: "",
    category: "",
    service: "",
    projectTitle: "",
    description: "",
    projectDuration: "",
    projectDurationType: "days",
    maximumPrice: "",
    bidRange: "",
    budget: "",
    currency: "NGN",
    expertLevel: "four",
    milestonesnumber: 1,
  });

  const handleProjectTypeChange = (type: "regular" | "biddable") => {
    setProjectType(type);
  };

  const handleLevelChange = (levelNumber: string) => {
    setPostJob({
      ...postJob,
      expertLevel: levelNumber,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostJob((prev: any) => ({
      ...prev,
      [name]:
        name === "budget" || name === "maximumPrice" || name === "bidRange"
          ? formatInputTextNumberWithCommas(value)
          : name === "projectDuration"
          ? formatInputTextNumber(value)
          : name === "milestonesnumber"
          ? Number(value)
          : value,
    }));
  };

  const handleChangePlannedJob = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "startDate" && new Date(value) < new Date()) {
      showToast({
        message: "Start date cannot be in the past.",
        type: "error",
      });
      return;
    } else if (
      name === "startDate" &&
      plannedJob.endDate &&
      new Date(value) > new Date(plannedJob.endDate)
    ) {
      showToast({
        message: "Start date cannot be after end date.",
        type: "error",
      });
      return;
    } else if (
      name === "endDate" &&
      plannedJob.startDate &&
      new Date(value) < new Date(plannedJob.startDate)
    ) {
      showToast({
        message: "End date cannot be before start date.",
        type: "error",
      });
      return;
    }
    setPlannedJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReminderDatesChange = (index: number, value: number) => {
    if (reminderDates.includes(value)) {
      showToast({
        message: "Reminder date already exists.",
        type: "error",
      });
      return;
    }
    const updatedReminders = [...reminderDates];
    updatedReminders[index] = value;
    setReminderDates(updatedReminders);
  };

  const addReminder = () => {
    if (reminderDates.length < 3) {
      setReminderDates([...reminderDates, 1]);
    }
  };

  const removeReminder = (index: number) => {
    if (reminderDates.length > 1) {
      setReminderDates(reminderDates.filter((_, i) => i !== index));
    }
  };

  return {
    postJob,
    setPostJob,
    loading,
    setLoading,
    handleChange,
    projectType,
    handleLevelChange,
    handleProjectTypeChange,
    nextPage,
    setNextPage,
    plannedJob,
    setPlannedJob,
    handleChangePlannedJob,
    reminderDates,
    setReminderDates,
    addReminder,
    removeReminder,
    handleReminderDatesChange,
  };
};
