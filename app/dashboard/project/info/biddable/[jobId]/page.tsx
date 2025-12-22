import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import ProjectInfo from "@/features/projects/components/ProjectInfo";

const BiddbaleProjectInfoPage = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <div className="relative">
      <DashboardNavbar />
      <ProjectInfo projectId={jobId} />
    </div>
  );
};

export default BiddbaleProjectInfoPage;
