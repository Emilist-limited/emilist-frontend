import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import TransactionsWrapper from "@/features/transactions/components/TransactionsWrapper";

const TransactionPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <TransactionsWrapper />
    </div>
  );
};

export default TransactionPage;
