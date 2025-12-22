import { useState } from "react";

export interface ContractType {
  recommendVendor: "Yes" | "No" | "Maybe";
  review: string;
}

export const useCloseContractState = () => {
  const [loadingContract, setLoaingContract] = useState(false);
  const [openContractModal, setOpenContractModal] = useState(false);
  const [rateServiceProvider, setRateServiceProvider] = useState(0);
  const [rateServiceRendered, setRateServiceRendered] = useState(0);
  const [contractDetails, setContractDetails] = useState<ContractType>({
    recommendVendor: "Yes",
    review: "",
  });

  const handleContractChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContractDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const onCancel = () => {
    setOpenContractModal(false);
  };

  return {
    onCancel,
    loadingContract,
    setLoaingContract,
    openContractModal,
    setOpenContractModal,
    rateServiceProvider,
    setRateServiceProvider,
    rateServiceRendered,
    setRateServiceRendered,
    contractDetails,
    handleContractChange,
  };
};
