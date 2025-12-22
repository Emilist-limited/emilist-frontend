import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import DirectJobInfoWrapper from "@/features/jobs/components/DirectJobInfoWrapper";

const page = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;
  return (
    <div className="relative">
      <DashboardNavbar />
      <DirectJobInfoWrapper jobId={jobId} />
    </div>
  );
};

export default page;
