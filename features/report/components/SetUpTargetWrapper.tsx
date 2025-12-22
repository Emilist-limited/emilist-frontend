"use client";

import Image from "next/image";

import LightGreenLayout from "@/components/templates/LightGreenLayout";
import Label from "@/components/atoms/Label";
import FormSelect from "@/components/molecules/FormSelect";
import CustomButton from "@/components/atoms/CustomButton";

import { currencyLabel } from "@/lib/constants";
import { useSetUpTarget } from "../hooks/useSetUpTarget";
import { FormInput } from "@/components/molecules/FormInput";

const SetUpTargetWrapper = () => {
  const {
    duration,
    setDuration,
    target,
    handleChnage,
    loading,
    handleSubmitTarget,
  } = useSetUpTarget();

  const targetDuration: { value: string; label: string }[] = [
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <LightGreenLayout>
      <div className="w-full">
        <div className="w-full py--10">
          <h1 className="sm:text-3xl font-bold text-xl my-6">
            Set up your monthly/ yearly targets
          </h1>
          <div className="grid grid-cols-4 gap-10 max-w-4xl w-full bg-white rounded-lg p-6 px-4">
            <div className="col-span-2  max-sm:col-span-4 flex flex-col gap-1">
              <Label htmlFor="projectType">
                Set up target for monthly or yearly
              </Label>
              <div className="w-full flex flex-col gap-3">
                {targetDuration.map((type) => (
                  <div
                    key={type.value}
                    className={`flex items-center cursor-pointer ${
                      duration === type.value ? "text-primary-green" : ""
                    }`}
                    onClick={() => setDuration(type.value)}
                  >
                    <Image
                      src={
                        duration === type.value
                          ? "/icons/circle-color.svg"
                          : "/icons/circle.svg"
                      }
                      alt="menu"
                      width={25}
                      height={25}
                      className="object-contain w-6 h-6"
                    />
                    <label htmlFor={type.label} className="ml-3 cursor-pointer">
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2  max-sm:col-span-4">
              <FormInput
                label="Referrals"
                id="referrals"
                name="referrals"
                type="text"
                value={target?.referrals}
                onChange={handleChnage}
              />
              <p className="text-xs text-dark-green">
                Number of times you want to be referred
              </p>
            </div>
            <div className="col-span-2 max-sm:col-span-4">
              <FormInput
                label="Job"
                id="job"
                name="job"
                type="text"
                value={target?.job}
                onChange={handleChnage}
              />
              <p className="text-xs text-dark-green">
                Number of jobs you want to get within the selected period of
                time
              </p>
            </div>
            <div className="col-span-2  max-sm:col-span-4">
              <FormInput
                label="Friends"
                id="invites"
                name="invites"
                type="text"
                value={target?.invites}
                onChange={handleChnage}
              />
              <p className="text-xs text-dark-green">
                Number of friends you want to invite
              </p>
            </div>
            <div className="col-span-2 max-sm:col-span-4">
              <FormInput
                label="Amount"
                id="amount"
                name="amount"
                type="text"
                value={target?.amount}
                onChange={handleChnage}
              />
            </div>
            <div className="col-span-2 max-sm:col-span-4">
              <FormSelect
                label="Currency"
                id="currency"
                name="currency"
                value={target?.currency}
                onChange={handleChnage}
                options={currencyLabel}
              />
            </div>

            <div className="flex  my-10 justify-center col-span-4">
              <CustomButton loading={loading} onClick={handleSubmitTarget}>
                Set Target
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </LightGreenLayout>
  );
};

export default SetUpTargetWrapper;
