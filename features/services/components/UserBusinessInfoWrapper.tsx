"use client";

import { useGetServiceInfo } from "../hooks/useGetServiceInfo";

import LightGreenLayout from "@/components/templates/LightGreenLayout";
import PageLoader from "@/components/atoms/PageLoader";
import UserBusinessInfo from "./UserBusinessInfo";
import ServiceCoverageInsurance from "./ServiceCoverageInsurance";
import MembershipCertificateInfo from "./MembershipCertificateInfo";

const UserBusinessInfoWrapper = ({ serviceId }: { serviceId: string }) => {
  const { loading, serviceInfo } = useGetServiceInfo(serviceId);

  return (
    <LightGreenLayout>
      {loading ? (
        <PageLoader height="h-[60vh]" />
      ) : (
        <div className="grid grid-cols-12 py-10 gap-6">
          <UserBusinessInfo serviceInfo={serviceInfo} serviceId={serviceId} />
          <ServiceCoverageInsurance serviceInfo={serviceInfo} />
          <MembershipCertificateInfo serviceInfo={serviceInfo} />
        </div>
      )}
    </LightGreenLayout>
  );
};

export default UserBusinessInfoWrapper;
