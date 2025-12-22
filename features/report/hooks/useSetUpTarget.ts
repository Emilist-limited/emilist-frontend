import { useState } from "react";

import { useToast } from "@/lib/hooks/useToast";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { removeCommas } from "@/lib/helpers/removeCommas";

export const useSetUpTarget = () => {
  const { showToast } = useToast();
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState({
    job: "",
    invites: "",
    referrals: "",
    amount: "",
    currency: "NGN",
  });

  const handleChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTarget((details) => ({
      ...details,
      [name]: ["job", "invites", "referrals", "amount"].includes(name)
        ? formatInputTextNumberWithCommas(value)
        : value,
    }));
  };

  const handleSubmitTarget = async () => {
    const { job, invites, referrals, amount, currency } = target;
    if (!duration) {
      return showToast({
        message: `Please select duration`,
        type: "error",
      });
    } else if (!job && !invites && !referrals && !amount) {
      return showToast({
        message: `Set at least one target before submitting.`,
        type: "error",
      });
    }
    setLoading(true);

    try {
      const payload = {
        duration: duration ? removeCommas(duration) : "",
        job: job ? removeCommas(job) : "",
        invites: invites ? removeCommas(invites) : "",
        referrals: referrals ? removeCommas(referrals) : "",
        amount: amount ? removeCommas(amount) : "",
        currency,
      };
      await axiosInstance.post(`/target/create-target`, payload);

      showToast({
        message: `Successful`,
        type: "success",
      });
      setDuration("");
      setTarget({
        job: "",
        invites: "",
        referrals: "",
        amount: "",
        currency: "",
      });
    } catch (error) {
      console.log("error setting target", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    duration,
    setDuration,
    target,
    handleChnage,
    loading,
    handleSubmitTarget,
  };
};
