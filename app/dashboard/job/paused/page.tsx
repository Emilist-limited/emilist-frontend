import JobDashboardLayout from "@/features/jobs/components/JobDashboardLayout";
import PausedJobs from "@/features/jobs/components/PausedJobs";

const PausedJobsPage = () => {
  return (
    <JobDashboardLayout>
      <PausedJobs />
    </JobDashboardLayout>
  );
};

export default PausedJobsPage;
