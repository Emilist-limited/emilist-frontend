import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import BiddableJobInfoWrapper from "@/features/jobs/components/BiddableJobInfoWrapper";

const BiddableJobInfoPage = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <div className="relative">
      <DashboardNavbar />
      <BiddableJobInfoWrapper jobId={jobId} />
    </div>
  );
};

export default BiddableJobInfoPage;
