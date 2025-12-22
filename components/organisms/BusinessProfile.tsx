import { numberWithCommas } from "@/lib/helpers";
import { BusinessProfileProps } from "@/features/services/types";

import StatItem from "../atoms/StatItem";
import BusinessHeader from "../molecules/BusinessHeader";
import ReadMore from "../molecules/ReadMore";
import BusinessOwnerInfo from "../molecules/BusinessOwnerInfo";
import PublicInsuranceWrapper from "@/features/services/components/PublicInsuranceWrapper";
import PublicCertificateWrapper from "@/features/services/components/PublicCertificateWrapper";
import PublicMembershipWrapper from "@/features/services/components/PublicMembershipWrapper";

const BusinessProfile = ({
  handleOpenModal,
  serviceInfo,
  isBusinessOwnerCurrentUser,
}: BusinessProfileProps) => {
  return (
    <div className="space-y-8">
      <div>
        <BusinessHeader
          firstName={serviceInfo.firstName}
          lastName={serviceInfo.lastName}
          profileImage={serviceInfo.profileImage}
          level={serviceInfo?.userId?.level}
          rating={serviceInfo?.averageRating}
          totalReviews={serviceInfo?.totalReviews}
          handleOpenModal={handleOpenModal}
          isBusinessOwnerCurrentUser={isBusinessOwnerCurrentUser}
        />
      </div>

      <BusinessOwnerInfo
        createdAt={serviceInfo.createdAt}
        state={serviceInfo.state}
        country={serviceInfo.country}
        languages={serviceInfo.languages}
        noticePeriod={serviceInfo.noticePeriod}
      />

      <div className="py-6 max-w-4xl">
        <ReadMore
          text={serviceInfo.bio || "No bio provided"}
          maxLength={600}
          style="text-[#303632] lg:col-span-3"
        />
      </div>

      <div className="flex flex-col gap-4">
        <StatItem
          label="Total Jobs"
          value={
            serviceInfo.totalJobs ? numberWithCommas(serviceInfo.totalJobs) : 0
          }
        />
        <StatItem
          label="Successful Jobs"
          value={
            serviceInfo.successfulJobs
              ? numberWithCommas(serviceInfo.successfulJobs)
              : 0
          }
        />
        <StatItem
          label="Unsuccessful Jobs"
          value={
            serviceInfo.unsuccessfulJobs
              ? numberWithCommas(serviceInfo.unsuccessfulJobs)
              : 0
          }
        />
        <StatItem
          label="Job Success Rate"
          value={
            serviceInfo.successRate
              ? `${numberWithCommas(serviceInfo.successRate)}%`
              : "N/A"
          }
        />
      </div>
      <PublicInsuranceWrapper insurances={serviceInfo?.insurance} />
      <PublicCertificateWrapper certification={serviceInfo?.certification} />
      <PublicMembershipWrapper memberships={serviceInfo?.membership} />
    </div>
  );
};
export default BusinessProfile;
