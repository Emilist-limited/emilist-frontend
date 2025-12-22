import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserBusinessInfoWrapper from "@/features/services/components/UserBusinessInfoWrapper";

const page = ({ params }: { params: { serviceId: string } }) => {
  const serviceId = params?.serviceId;
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserBusinessInfoWrapper serviceId={serviceId} />
    </div>
  );
};

export default page;
