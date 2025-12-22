"use client";

import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";

import { Column } from "./Column";
import { Transaction } from "../types";

import TableComponent from "@/components/organisms/TableComponent";

interface TransactionHistoryProps {
  transactions: Transaction[];
  totalPages: number;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  goToLastPage: () => void;
  goToFirstPage: () => void;
  isFirstPage: () => boolean;
  isLastPage: () => boolean;
  limit: number;
  setLimit: (limit: number) => void;
}

const TransactionHistory = ({
  transactions,
  totalPages,
  currentPage,
  prevPage,
  nextPage,
  goToLastPage,
  goToFirstPage,
  isFirstPage,
  isLastPage,
  limit,
  setLimit,
}: TransactionHistoryProps) => {
  const typedColumns = Column as ColumnDef<Transaction>[];
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1],
      }}
    >
      <div className="w-full py-10">
        <TableComponent
          columns={typedColumns}
          data={transactions}
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
      </div>
    </motion.div>
  );
};

export default TransactionHistory;
