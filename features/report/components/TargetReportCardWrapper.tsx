import TargetReportCard from "./TargetReportCard";

import { getCurrencySign } from "@/lib/helpers/getCurrencySign";
import { TargetReportCardWrapperProps } from "../types";
import { numberWithCommas } from "@/lib/helpers";

const TargetReportCardWrapper = ({ target }: TargetReportCardWrapperProps) => {
  return (
    <div className="flex items-center flex-wrap max-w-full w-full gap-6">
      <TargetReportCard
        title="Jobs"
        description="Track job target and current jobs done."
        current={
          target?.jobs?.current && numberWithCommas(target?.jobs?.current)
        }
        target={target?.jobs?.target && numberWithCommas(target?.jobs?.target)}
        percentage={target?.jobs?.percentage || 0}
        barStyle="progress-primary"
      />
      <TargetReportCard
        title="Amount earned"
        description="Displays target earnings and current amount earned."
        current={`${target?.currency && getCurrencySign(target?.currency)}${
          target?.amount?.current && numberWithCommas(target?.amount?.current)
        }`}
        target={`${target?.currency && getCurrencySign(target?.currency)}${
          target?.amount?.target && numberWithCommas(target?.amount?.target)
        }`}
        percentage={target?.amount?.percentage || 0}
        barStyle="progress-warning"
      />
      <TargetReportCard
        title="Customer Referral"
        description="Tracks customer referral goal and current referrals made."
        current={
          target?.referrals?.current &&
          numberWithCommas(target?.referrals?.current)
        }
        target={
          target?.referrals?.target &&
          numberWithCommas(target?.referrals?.target)
        }
        percentage={target?.referrals?.percentage || 0}
        barStyle="progress-success"
      />
      <TargetReportCard
        title="Friends Invited"
        description="Shows friends invited goal and current invitations sent."
        current={
          target?.invites?.current && numberWithCommas(target?.invites?.current)
        }
        target={
          target?.invites?.target && numberWithCommas(target?.invites?.target)
        }
        percentage={target?.invites?.percentage || 0}
        barStyle="progress-error"
      />
    </div>
  );
};

export default TargetReportCardWrapper;
