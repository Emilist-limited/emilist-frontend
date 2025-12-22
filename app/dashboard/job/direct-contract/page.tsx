import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import DirectContractForm from "@/features/jobs/components/forms/DirectContractForm";

const PostDirectContractPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <DirectContractForm />
    </div>
  );
};

export default PostDirectContractPage;
