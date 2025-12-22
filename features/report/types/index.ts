export interface Target {
  currency: string;
  jobs: {
    current: number | string;
    target: number | string;
    percentage: number;
  };
  amount: {
    current: number | string;
    target: number | string;
    percentage: number;
  };
  referrals: {
    current: number | string;
    target: number | string;
    percentage: number;
  };
  invites: {
    current: number | string;
    target: number | string;
    percentage?: number;
  };
}

// Component props type
export interface TargetReportCardWrapperProps {
  target: Target;
}
