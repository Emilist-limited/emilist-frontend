import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Jobs, Milestone } from "@/features/jobs/types";

export interface invoiceInfoType {
  additionalAmount: string;
  note: string;
}

export interface UploadMilestoneInvoiceModalProps {
  isOpen: boolean;
  onCancel: () => void;
  milestoneId: string;
  milestoneAmount: number;
  onUploadInvoice: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string
  ) => void;
  currency: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  invoiceInfo: invoiceInfoType;
  isSubmitting: boolean;
}

export interface ProjectMilestoneInfoWrapperProps {
  jobInfo: Jobs;
  currentMilestone: Milestone;
  setCurrentMilestone: (milestone: Milestone) => void;
  setOpenInvoice: Dispatch<SetStateAction<boolean>>;
  openInvoice: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  invoiceInfo: invoiceInfoType;
  onUploadInvoice: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string
  ) => void;
  showPaymentDetails: boolean;
  isSubmitting: boolean;
}

export interface ProjectMilestonePanelProps {
  currentMilestone: Milestone;
  setOpenInvoice: Dispatch<SetStateAction<boolean>>;
  openInvoice: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  invoiceInfo: invoiceInfoType;
  onUploadInvoice: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string
  ) => void;
  showPaymentDetails: boolean;
  isSubmitting: boolean;
  currency: string;
}
