"use client";

import { AnimatePresence } from "framer-motion";

import { useGetAllTransactions } from "@/features/transactions/hooks/useGetAllTransactions";

import PageLoader from "@/components/atoms/PageLoader";
import LightGreenLayout from "@/components/templates/LightGreenLayout";
import WalletSummaryWrapper from "./WalletSummaryWrapper";
import WalletActionButtons from "./WalletActionButtons";
import TransactionHistory from "@/features/transactions/components/TransactionHistory";

const WalletWrapper = () => {
  const {
    loading,
    transactions,
    totalPages,
    totalTransactions,
    prevPage,
    nextPage,
    goToLastPage,
    goToFirstPage,
    isFirstPage,
    isLastPage,
    limit,
    setLimit,
    currentPage,
  } = useGetAllTransactions("Wallet");

  return (
    <LightGreenLayout>
      <div className="py-6">
        {loading ? (
          <PageLoader height="h-[60vh]" />
        ) : (
          <>
            <WalletSummaryWrapper totalTransactions={totalTransactions} />
            <WalletActionButtons />
            <AnimatePresence>
              <TransactionHistory
                transactions={transactions}
                totalPages={totalPages}
                currentPage={currentPage}
                prevPage={prevPage}
                nextPage={nextPage}
                goToLastPage={goToLastPage}
                goToFirstPage={goToFirstPage}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                limit={limit}
                setLimit={setLimit}
              />
            </AnimatePresence>
          </>
        )}
      </div>
    </LightGreenLayout>
  );
};

export default WalletWrapper;
