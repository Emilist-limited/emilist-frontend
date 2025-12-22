import {
  ChangeEvent,
  Dispatch,
  FocusEventHandler,
  SetStateAction,
} from "react";
import { ContractType } from "../hooks/useCloseContractState";

export interface FetchJobsParams {
  currentPage: number;
  userId?: string;
  search: string;
  filterName?: string;
  filterLocation: string;
  filterService: string;
}

export interface TimeFrameType {
  number: string;
  period: string;
}

export interface InvoiceType {
  additionalAmount: number;
  invoiceRaised: boolean;
  note?: string;
}

export interface PaymentInfoType {
  amountPaid: number;
  paymentMethod: string;
  paymentStatus: string;
  date: Date;
}

export interface PaymentDetails {
  paymentMethod: string;
  note?: string;
}

export interface Milestone {
  timeFrame: TimeFrameType;
  invoice?: InvoiceType;
  achievement: string;
  amount: number;
  status?: string;
  paymentStatus?: string;
  _id?: string;
  paymentInfo?: PaymentInfoType;
  accountDetails?: any;
}

export interface JobUserInfo {
  _id: string;
  email: string;
  userName: string;
  fullName: string;
  profileImage: string;
  level: string;
  location?: string;
}

export interface JobFilesType {
  id?: string;
  url?: string;
  imageUrl?: string;
  _id?: string;
}

export interface ClickType {
  users?: string[];
  clickCount?: number;
}

export interface PostJobType {
  invite?: string;
  category: string;
  service: string;
  projectTitle: string;
  description: string;
  projectDuration: string;
  projectDurationType: "days" | "weeks" | "months";
  maximumPrice: string;
  bidRange: string;
  budget: string;
  currency: string;
  expertLevel: string;
  milestonesnumber: number;
}

export interface BiddableDetails {
  maximumPrice: number;
  milestones:
    | Array<{
        milestoneId: string;
        amount: number;
        achievement: string;
        _id: string;
      }>
    | [];
}

export interface Application {
  biddableDetails: BiddableDetails;
  _id: string;
  job: string;
  user: JobUserInfo;
  creator: string;
  status: string;
  businessId: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  acceptedAt?: string;
}

export interface Jobs {
  _id: string;
  category: string;
  service: string;
  title: string;
  description: string;
  type: string;
  budget?: number;
  maximumPrice?: number;
  bidRange?: number;
  location: string;
  expertLevel: string;
  achievementDetails: string;
  currency: string;
  status: string;
  userId: JobUserInfo;
  isRequestForQuote: boolean;
  isClosed: string;
  createdAt: Date;
  liked: boolean;
  milestones: Milestone[];
  applications: Application[] | [];
  jobFiles: JobFilesType[] | [];
  clicks: ClickType;
  acceptedApplicationId?: string;
  startDate?: Date;
  dueDate?: Date;
  milestoneProgress?: string;
  currentMilestoneDueDate?: Date;
  overallDueDate?: Date;
  duration: TimeFrameType;
  milestoneNumber: number;
  milestoneDueDate?: Date;
}

export interface FilterJobWrapperProps {
  minValue: number;
  maxValue: number;
  handleMinChange: (value: number) => void;
  handleMaxChange: (value: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  filterLocation: string;
  setFilterLocation: (currency: string) => void;
  getAllJobs: () => Promise<void>;
  filterService: string;
  setFilterService: Dispatch<SetStateAction<string>>;
}

export interface JobListProps {
  allJobs: Jobs[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  getAllJobs: () => Promise<void>;
}

export interface ActiveJobDetailsProps {
  jobInfo: any;
  jobId: string;
  updateApplicationStatus: (
    applicantId: string,
    status: string,
    onSuccess: () => void
  ) => Promise<void>;
  requestQuote: (jobId: string, onSuccess: () => void) => Promise<void>;
  acceptQuote: (
    quoteId: string,
    status: string,
    onSuccess: () => void
  ) => Promise<void>;
  getJobInfo: () => Promise<void>;
  onToggleQuoteInfo: () => void;
  openQuoteInfoModal: boolean;
}

export interface ActiveJobActionDropdownProps {
  jobInfo: any;
  updateApplicationStatus: (
    applicantId: string,
    status: string,
    onSuccess: () => void
  ) => Promise<void>;
  toggleActionButton: () => void;
  requestQuote: (jobId: string, onSuccess: () => void) => Promise<void>;
  acceptedApplicationId: string;
  getJobInfo: () => Promise<void>;
  acceptQuote: (
    quoteId: string,
    status: string,
    onSuccess: () => void
  ) => Promise<void>;
  jobId: string;
  acceptedApplication: any;
  canViewQuote: boolean;
  onToggleQuoteInfo: () => void;
  openQuoteInfoModal: boolean;
}

export interface JobPaymentModalProps {
  isOpen: boolean;
  onCancel: () => void;
  paymentDetails: PaymentDetails;
  confirmPayment: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string,
    jobId: string
  ) => Promise<void>;
  loadingPayment: boolean;
  handlePaymentChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  milestoneId: string;
  jobId: string;
  setCurrency: (currency: string) => void;
  currency: string;
  amount: number;
  jobCurrency: string;
  additionalAmount?: number;
  note?: string;
  isAdditionalAmount: boolean;
  setIsAdditionalAmount: (isAdditionalAmount: boolean) => void;
}

export interface JobMilestonePanelProps {
  currency: string;
  jobCurrency: string;
  currentMilestone: Milestone;
  openPaymentModal: boolean;
  onCancelPayment: () => void;
  loadingPayment: boolean;
  isAdditionalAmount: boolean;
  setIsAdditionalAmount: Dispatch<React.SetStateAction<boolean>>;
  setCurrency: Dispatch<React.SetStateAction<string>>;
  jobId: string;
  setOpenPaymentModal: Dispatch<React.SetStateAction<boolean>>;
  paymentDetails: PaymentDetails;
  handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPayment: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string,
    jobId: string
  ) => Promise<void>;
}

export interface ActiveMilestoneInfoWrapperProps {
  jobInfo: Jobs;
  openPaymentModal: boolean;
  setOpenPaymentModal: Dispatch<React.SetStateAction<boolean>>;
  onCancelPayment: () => void;
  confirmPayment: (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string,
    jobId: string
  ) => Promise<void>;
  loadingPayment: boolean;
  paymentDetails: PaymentDetails;
  handlePaymentChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  currency: string;
  setCurrency: Dispatch<React.SetStateAction<string>>;
  isAdditionalAmount: boolean;
  setIsAdditionalAmount: Dispatch<React.SetStateAction<boolean>>;
  currentMilestone: Milestone;
  setCurrentMilestone: (milestone: Milestone) => void;
  setOpenContractModal: Dispatch<React.SetStateAction<boolean>>;
  openContractModal: boolean;
  onCancel: () => void;
  setRateServiceRendered: Dispatch<React.SetStateAction<number>>;
  setRateServiceProvider: Dispatch<React.SetStateAction<number>>;
  rateServiceProvider: number;
  rateServiceRendered: number;
  contractDetails: ContractType;
  handleContractChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  closeContract: (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    onSuccess: () => void
  ) => Promise<void>;
  loadingContract: boolean;
  getJobInfo: () => Promise<void>;
}

export interface MilestonePer {
  duration: string;
  durationType: string;
  details: string;
  amount: any;
  percentage: any;
}

export interface Milestonee {
  milestoneId: string;
  achievement: string;
  amount: number;
}

export interface ApplyBiddableJobModalProps {
  isOpen: boolean;
  onCancel: () => void;
  jobInfo: any;
  handleSetPercentage: (index: number, value: string) => void;
  handleAchievementChange: (index: number, newAchievement: string) => void;
  setMilestones: Dispatch<SetStateAction<Milestonee[]>>;
  setPercentage: Dispatch<SetStateAction<string[]>>;
  percentage: string[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onApplyJob: (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    businessId: string
  ) => void;
  bidLoading: boolean;
  setMaxPrice: Dispatch<SetStateAction<number | string>>;
  maxPrice: number | string;
  milestones: Milestonee[];
  handlePercentageBlur: FocusEventHandler<HTMLInputElement>;
}

export interface AnalyticsType {
  totalJobsPosted: number;
  totalArtisansHired: number;
}

export interface PlannedJobType {
  frequency: string;
  endDate: string;
  startDate: string;
}

export interface QuoteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  jobInfo: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  amount: number | string;
  isSubmitting: boolean;
  percentage: string[];
  handleSetPercentage: (index: number, value: string) => void;
  handleAchievementChange: (index: number, newAchievement: string) => void;
  milestones: Milestonee[];
  setMilestones: Dispatch<SetStateAction<Milestonee[]>>;
  setPercentage: Dispatch<SetStateAction<string[]>>;
  handlePercentageBlur: FocusEventHandler<HTMLInputElement>;
  setAmount: Dispatch<SetStateAction<number | string>>;
  onRespondQuote: (e: React.FormEvent<HTMLFormElement>) => void;
}
