import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import EditJobForm from "@/features/jobs/components/forms/EditJobForm";

const EditDirectJobPage = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <div className="relative">
      <DashboardNavbar />
      <EditJobForm jobId={jobId} title="Edit Direct Job" />
    </div>
  );
};

export default EditDirectJobPage;
