"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useVerifyPaymentStatus } from "@/lib/hooks/useVerifyPaymentStatus";
import { goBack } from "@/lib/helpers/goBack";
import CustomButton from "@/components/atoms/CustomButton";
import { ROUTES } from "@/lib/constants/routes";
import Logo from "@/components/atoms/Logo";

const StatusPage = () => {
  const searchParams = useSearchParams();

  const reference = searchParams.get("reference");
  const queryStatus = searchParams.get("status");

  const { status, loading, verifyPaymentStatus } = useVerifyPaymentStatus();

  useEffect(() => {
    if (reference) verifyPaymentStatus(reference);
  }, [reference]);

  return (
    <div className="w-full max-h-screen h-screen padding-ctn pt-8 bg-white flex flex-col">
      <Logo />
      {loading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[50vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  p-6 flex-1">
          <div className="shadow-md rounded-lg p-8 text-center flex flex-col items-center justify-center ">
            {status || queryStatus === "success" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-16 h-16 text-green-500 mb-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.707-7.293a1 1 0 011.414 0l4-4a1 1 0 00-1.414-1.414l-3.293 3.293L9.707 9.707a1 1 0 10-1.414 1.414l3 3z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Transaction Successful
                </h1>
                <p className="text-gray-600 mt-2">
                  Thank you! Your transaction was completed successfully.
                </p>
                <div className="flex gap-5 pt-10">
                  <CustomButton href={ROUTES?.DASHBOARD_JOB}>
                    Dashboard
                  </CustomButton>
                  <CustomButton onClick={goBack}>Back</CustomButton>
                </div>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-16 h-16 text-red-500 mb-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-4.707-7.293a1 1 0 001.414 0L12 12.414l3.293 3.293a1 1 0 001.414-1.414L13.414 11l3.293-3.293a1 1 0 00-1.414-1.414L12 9.586 8.707 6.293a1 1 0 10-1.414 1.414L10.586 11l-3.293 3.293a1 1 0 000 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Payment Failed
                </h1>
                <p className="text-gray-600 mt-2">
                  Sorry, your payment could not be processed. Please try again.
                </p>
                <div className="flex gap-5 pt-10">
                  <CustomButton href={ROUTES?.DASHBOARD_JOB}>
                    Dashboard
                  </CustomButton>
                  <CustomButton onClick={goBack}>Back</CustomButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPage;
