import BusinessBio from "./BusinessBio";
import BusinessImages from "./BusinessImages";
import MoreBusinessInfo from "./MoreBusinessInfo";
import UserBusinessHeader from "./UserBusinessHeader";
import UserServices from "./UserServices";

interface UserBusinessInfoProps {
  serviceInfo: any;
  serviceId: string;
}

const UserBusinessInfo = ({
  serviceInfo,
  serviceId,
}: UserBusinessInfoProps) => {
  return (
    <div className="lg:col-span-9 col-span-12 w-full bg-white rounded-lg py-6">
      <UserBusinessHeader
        businessId={serviceId}
        businessTitle={serviceInfo?.business?.businessName}
      />
      <UserServices services={serviceInfo?.business?.services} />
      <MoreBusinessInfo serviceInfo={serviceInfo} />
      <BusinessBio bio={serviceInfo?.business?.bio} />
      <BusinessImages businessImages={serviceInfo?.business?.businessImages} />
    </div>
  );
};

export default UserBusinessInfo;
