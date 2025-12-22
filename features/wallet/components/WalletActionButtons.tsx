"use client";

import AddWalletModal from "@/components/organisms/modal/AddWalletModal";
import CustomButton from "@/components/atoms/CustomButton";
import FundWalletModal from "@/components/organisms/modal/FundWalletModal";

import { useAddNewWallet } from "../hooks/useAddNewWallet";
import { useFundWallet } from "../hooks/useFundWallet";

const WalletActionButtons = () => {
  const {
    setDefault,
    currency,
    setCurrency,
    isLoading,
    handleSubmit,
    onCancel: toggleAddWalletModal,
    isOpen,
  } = useAddNewWallet();
  const {
    handleChange,
    handleFundWallet,
    loading,
    setWalletInfo,
    paymentProof,
    fundInfo,
    handleChangeFile,
    handleDelete,
    openModal,
    toggleModal,
  } = useFundWallet();

  return (
    <div className="py-6 flex-c-b w-full">
      <CustomButton onClick={toggleModal}>Fund wallet</CustomButton>
      <CustomButton onClick={toggleAddWalletModal}>
        Add more wallet
      </CustomButton>
      <AddWalletModal
        isOpen={isOpen}
        onCancel={toggleAddWalletModal}
        currency={currency}
        setCurrency={setCurrency}
        isLoading={isLoading}
        setIsDefault={setDefault}
        handleSubmit={handleSubmit}
      />
      <FundWalletModal
        isOpen={openModal}
        onCancel={toggleModal}
        handleChange={handleChange}
        handleChangeFile={handleChangeFile}
        handleDelete={handleDelete}
        handleFundWallet={handleFundWallet}
        loading={loading}
        setWalletInfo={setWalletInfo}
        paymentProof={paymentProof}
        fundInfo={fundInfo}
      />
    </div>
  );
};

export default WalletActionButtons;
