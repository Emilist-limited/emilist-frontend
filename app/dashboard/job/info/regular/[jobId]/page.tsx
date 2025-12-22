import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import RegularJobInfoWrapper from "@/features/jobs/components/RegularJobInfoWrapper";

const RegularJobInfoPage = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <div>
      <DashboardNavbar />
      <RegularJobInfoWrapper jobId={jobId} />
    </div>
  );
};

export default RegularJobInfoPage;
