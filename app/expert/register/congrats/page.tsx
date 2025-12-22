"use client";

import Link from "next/link";
import { useContext } from "react";

import dynamic from "next/dynamic";
import CustomButton from "@/components/atoms/CustomButton";
import DynamicNav from "@/components/molecules/DynamicNav";

import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const CongratulationPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <main className="relative">
      <DynamicNav bg>
        <div className="flex w-8 h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase">
          {(currentUser?.fullName ||
            currentUser?.userName)?.[0]?.toUpperCase() || "E"}
        </div>
      </DynamicNav>
      <Confetti
        width={typeof window !== "undefined" ? window.innerWidth : 0}
        height={typeof window !== "undefined" ? window.innerHeight : 0}
        recycle={false}
        numberOfPieces={3000}
        tweenDuration={15000}
        colors={["#ff6b6b", "#ff8e53", "#ffcccb", "#ffffff", "#0000ff"]}
      />
      <div className="w-full h-screen relative pt-24 flex justify-center items-center">
        <div className="w-full flex-c flex-col gap-4">
          <h1 className="text-4xl font-bold mb-3 max-sm:text-2xl">
            Congratulations!!!
          </h1>
          <p>You have successfully set up a business</p>
          <div className="flex gap-4 pt-10 max-md:flex-col max-md:w-full px-8">
            <Link
              href={ROUTES?.JOIN_EXPERT}
              className="px-6 text-center rounded-lg font-medium whitespace-nowrap max-sm:text-sm max-sm:px-5 flex items-center justify-center border-1 border-[#303632] h-11"
            >
              Set up another business
            </Link>
            <CustomButton href={ROUTES?.DASHBOARD_EXPERT} className="w-full">
              Proceed to Dashboard
            </CustomButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CongratulationPage;
