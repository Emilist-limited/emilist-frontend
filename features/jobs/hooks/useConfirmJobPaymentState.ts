import { useState } from "react";

interface PaymentDetails {
  paymentMethod: string;
  note: string;
}

export const useConfirmJobPaymentState = () => {
  const [currency, setCurrency] = useState("");
  const [loadingPayment, setLoaingPayment] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isAdditionalAmount, setIsAdditionalAmount] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: "",
    note: "",
  });

  const handlePaymentChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onCancelPayment = () => {
    setOpenPaymentModal(false);
  };

  return {
    currency,
    setCurrency,
    loadingPayment,
    setLoaingPayment,
    openPaymentModal,
    setOpenPaymentModal,
    isAdditionalAmount,
    setIsAdditionalAmount,
    paymentDetails,
    handlePaymentChange,
    onCancelPayment,
  };
};
