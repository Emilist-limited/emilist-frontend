import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import WalletWrapper from "@/features/wallet/components/WalletWrapper";

const WalletPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <WalletWrapper />
    </div>
  );
};

export default WalletPage;
