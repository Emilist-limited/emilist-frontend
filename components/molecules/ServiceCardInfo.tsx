"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { Capitalize } from "@/lib/helpers";

import ReadMore from "./ReadMore";
import Rating from "./Rating";
import ProfileImage from "../atoms/ProfileImage";

const ServiceCardInfo = ({ expert }: { expert: any }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-2 flex-1">
      <Link
        href={
          currentUser?._id === expert?.userId
            ? ROUTES?.DASHBOARD_SERVICE_INFO(expert?._id)
            : ROUTES?.GENERAL_EXPERT_DETAILS(expert?._id)
        }
        className="sm:text-2xl font-bold hover:text-primary-green transition-all duration-300"
      >
        {expert?.services[0] && Capitalize(expert?.services[0])}
      </Link>
      <ReadMore text={expert?.bio} maxLength={100} style="text-sm" />
      <div className="flex-c-b  sm:gap-4 gap-2 flex-wrap">
        <div className="flex-c gap-1 max-sm:text-sm ">
          <Rating rating={expert?.averageRating || 0} />{" "}
          <span className="sm:text-sm text-xs">({expert?.totalReviews})</span>
        </div>
        <div className="flex-c gap-1">
          <Image
            src="/icons/briefcase.svg"
            width={40}
            height={40}
            alt="brief-case"
            className="w-4 h-4 object-contain"
          />
          <p className="sm:text-sm text-xs">
            {expert?.completedJobs} Jobs completed
          </p>
        </div>
      </div>
      <div className="flex-c-b sm:py-2 max-sm:hidden">
        <div className="flex-c gap-2">
          {expert?.profileImage ? (
            <ProfileImage
              src={expert?.profileImage}
              alt={expert?.firstName}
              className="h-8 w-8"
            />
          ) : (
            <p className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold">
              {expert?.firstName[0].toUpperCase()}
            </p>
          )}
          <h6 className="sm:text-sm text-xs">
            {expert?.firstName && Capitalize(expert?.firstName)}{" "}
            {expert?.lastName && Capitalize(expert?.lastName)}
          </h6>
        </div>
        <div className="max-sm:text-xs font-medium uppercase max-md:hidden">
          Level 5
        </div>
      </div>
    </div>
  );
};

export default ServiceCardInfo;
