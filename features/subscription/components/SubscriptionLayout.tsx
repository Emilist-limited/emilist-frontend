import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import SubscriptionHeader from "./SubscriptionHeader";

const SubscriptionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <main className="py-28 padding-ctn">
        <SubscriptionHeader />
        {children}
      </main>
    </div>
  );
};

export default SubscriptionLayout;
