import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import OngoingJobInfo from "@/features/jobs/components/OngoingJobInfo";

const OngoingDirectJobInfo = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <main className="relative">
      <DashboardNavbar />
      <OngoingJobInfo jobId={jobId} />
    </main>
  );
};

export default OngoingDirectJobInfo;
