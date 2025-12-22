import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import EditJobForm from "@/features/jobs/components/forms/EditJobForm";

const page = ({ params }: { params: { jobId: string } }) => {
  const jobId = params?.jobId;

  return (
    <div className="relative">
      <DashboardNavbar />
      <EditJobForm jobId={jobId} title="Edit Regular Job" />
    </div>
  );
};

export default page;
