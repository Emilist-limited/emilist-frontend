"use client";

import { motion } from "framer-motion";

import { container } from "@/anim";

import { FormInput } from "@/components/molecules/FormInput";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { useAddBankInfo } from "../hooks/useAddBankInfo";
import { asteriskAllExceptLastFour } from "@/lib/helpers/asteriskAllExceptLastFour";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import CustomButton from "@/components/atoms/CustomButton";

const BankDetails = () => {
  const {
    currentUser,
    loading,
    inputType,
    setInputType,
    handleChange,
    bankDetails,
    handleSubmitBankDetails,
    edit,
    setEdit,
  } = useAddBankInfo();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 pt-14 pb-44"
    >
      {loading && <WhiteBgLoader />}
      <>
        {currentUser?.accountDetails?.number && !edit ? (
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <p className="font-bold">Bank Name</p>
              <p>{currentUser?.accountDetails?.bank}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Account Number</p>
              <p>
                {currentUser?.accountDetails?.number &&
                  asteriskAllExceptLastFour(
                    currentUser?.accountDetails?.number
                  )}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Account Name</p>
              <p>{currentUser?.accountDetails?.holdersName}</p>
            </div>
            <CustomButton className="w-fit" onClick={() => setEdit(true)}>
              Edit bank details
            </CustomButton>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <FormInput
              label="Bank Name"
              id="bank"
              name="bank"
              value={bankDetails?.bank}
              onChange={handleChange}
            />
            <FormInput
              label="Account Number"
              id="number"
              name="number"
              value={bankDetails?.number}
              onChange={handleChange}
            />
            <FormInput
              label="Account Name"
              id="holdersName"
              name="holdersName"
              value={bankDetails?.holdersName}
              onChange={handleChange}
            />
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={bankDetails.password}
              onChange={handleChange}
              inputType={inputType}
              toggleInputType={() =>
                setInputType((prev) =>
                  prev === "password" ? "text" : "password"
                )
              }
            />
            <CustomButton className="w-fit" onClick={handleSubmitBankDetails}>
              Save changes
            </CustomButton>
          </div>
        )}
      </>
    </motion.div>
  );
};

export default BankDetails;
