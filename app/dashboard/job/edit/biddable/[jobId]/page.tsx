import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import EditJobForm from "@/features/jobs/components/forms/EditJobForm";

const EditBiddableJobPage = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <div className="relative">
      <DashboardNavbar />
      <EditJobForm jobId={jobId} title="Edit Biddable Job" />
    </div>
  );
};

export default EditBiddableJobPage;
