import { useCheckoutActions } from "./useCheckoutActions";
import { usePaymentActions } from "./usePaymentActions";

export const useCheckoutCart = () => {
  const { onCancel, handleCheckout, isLoading, open } = useCheckoutActions();
  const {
    handleOrderPayment,
    loading,
    paymentMethod,
    currency,
    setPaymentMethod,
    setCurrency,
  } = usePaymentActions();

  return {
    isLoading,
    handleCheckout,
    open,
    onCancel,
    handleOrderPayment,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymentMethod,
  };
};
