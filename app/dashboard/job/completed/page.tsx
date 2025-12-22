import CompletedJobs from "@/features/jobs/components/CompletedJobs";
import JobDashboardLayout from "@/features/jobs/components/JobDashboardLayout";

const CompletedJobsPage = () => {
  return (
    <JobDashboardLayout>
      <CompletedJobs />
    </JobDashboardLayout>
  );
};

export default CompletedJobsPage;
