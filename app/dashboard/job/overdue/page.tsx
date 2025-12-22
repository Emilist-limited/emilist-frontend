import JobDashboardLayout from "@/features/jobs/components/JobDashboardLayout";
import OverdueJobs from "@/features/jobs/components/OverdueJobs";

const OverdueJobsPage = () => {
  return (
    <JobDashboardLayout>
      <OverdueJobs />
    </JobDashboardLayout>
  );
};

export default OverdueJobsPage;
