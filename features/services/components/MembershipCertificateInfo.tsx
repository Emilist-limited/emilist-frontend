import CertificateInfo from "./CertificateInfo";
import MembershipInfo from "./MembershipInfo";

const MembershipCertificateInfo = ({ serviceInfo }: { serviceInfo: any }) => {
  return (
    <div className="lg:col-span-9 col-span-12 w-full bg-white rounded-lg py-6 sm:px-10 px-4 space-y-10">
      <MembershipInfo memberships={serviceInfo?.business?.membership} />
      <CertificateInfo certification={serviceInfo?.business?.certification} />
    </div>
  );
};

export default MembershipCertificateInfo;
