import ActiveJobs from "@/features/jobs/components/ActiveJobs";
import JobDashboardLayout from "@/features/jobs/components/JobDashboardLayout";

const ActiveJobsPage = () => {
  return (
    <JobDashboardLayout>
      <ActiveJobs />
    </JobDashboardLayout>
  );
};

export default ActiveJobsPage;
