"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";
import { numberWithCommas } from "@/lib/helpers";
import { WalletType } from "../types";

import WalletSummaryCard from "@/components/molecules/cards/WalletSummaryCard";

const WalletSummaryWrapper = ({
  totalTransactions,
}: {
  totalTransactions: number;
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex gap-6 flex-wrap">
      {currentUser?.wallets?.map((wallet: WalletType) => (
        <WalletSummaryCard
          key={wallet._id}
          title="Wallet balance"
          value={`${wallet?.currency && getCurrencySign(wallet?.currency)}${
            wallet?.balance && numberWithCommas(wallet?.balance)
          }`}
        />
      ))}
      <WalletSummaryCard
        title="Total transaction"
        value={totalTransactions && numberWithCommas(totalTransactions)}
      />
    </div>
  );
};

export default WalletSummaryWrapper;
