import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ShowToastFunction } from "@/types";

export const initiateCheckout = async (showToast: ShowToastFunction) => {
  try {
    await axiosInstance.post("/cart/checkout");
  } catch (error) {
    console.log("error checking out", error);
    promiseErrorFunction(error, showToast);
    throw error;
  }
};

export const initiateOrderPayment = async (
  cartId: string,
  paymentMethod: string,
  currency: string,
  showToast: ShowToastFunction
) => {
  if (!paymentMethod) {
    showToast({
      message: "Payment method not selected",
      type: "error",
      duration: 8000,
    });
    return;
  }
  if (!currency) {
    showToast({
      message: "Currency not selected",
      type: "error",
      duration: 8000,
    });
    return;
  }

  try {
    const payload = { cartId, paymentMethod, currency };
    const { data } = await axiosInstance.post(
      "/material/pay-for-product",
      payload
    );
    return data;
  } catch (error) {
    console.log("error initiating order payment", error);
    promiseErrorFunction(error, showToast);
    throw error;
  }
};
