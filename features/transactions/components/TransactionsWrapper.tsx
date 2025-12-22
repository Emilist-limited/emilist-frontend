"use client";

import { AnimatePresence } from "framer-motion";

import { numberWithCommas } from "@/lib/helpers";
import { useGetAllTransactions } from "../hooks/useGetAllTransactions";

import PageLoader from "@/components/atoms/PageLoader";
import LightGreenLayout from "@/components/templates/LightGreenLayout";
import TransactionHistory from "./TransactionHistory";
import WalletSummaryCard from "@/components/molecules/cards/WalletSummaryCard";

const TransactionsWrapper = () => {
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
  } = useGetAllTransactions();

  return (
    <LightGreenLayout>
      <div className="py-6">
        {loading ? (
          <PageLoader height="h-[60vh]" />
        ) : (
          <>
            <div className="flex gap-6 flex-wrap pt-8">
              <WalletSummaryCard
                title="Total transaction"
                value={totalTransactions && numberWithCommas(totalTransactions)}
              />
            </div>
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

export default TransactionsWrapper;
