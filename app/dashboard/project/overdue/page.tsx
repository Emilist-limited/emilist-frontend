import OverdueProjects from "@/features/projects/components/OverdueProjects";
import ProjectDashboardLayout from "@/features/projects/components/ProjectDashboardLayout";

const OverdueProjectPage = () => {
  return (
    <ProjectDashboardLayout>
      <OverdueProjects />
    </ProjectDashboardLayout>
  );
};

export default OverdueProjectPage;
