"use client";

import Link from "next/link";
import { useContext } from "react";

import PopularImage from "@/components/atoms/PopularImage";
import PopularPriceDisplay from "@/components/atoms/PopularPriceDisplay";
import PopularTitleName from "@/components/atoms/PopularTitleName";

import { ExpertCardProps } from "@/types";
import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onClick }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Link
      href={
        currentUser?._id === expert?.userId
          ? ROUTES?.DASHBOARD_SERVICE_INFO(expert?._id)
          : ROUTES?.GENERAL_EXPERT_DETAILS(expert?._id)
      }
      className="flex flex-col gap-2 group"
      onClick={onClick}
    >
      <PopularImage
        imageUrl={expert?.businessImages?.[0]?.imageUrl}
        title={expert?.services[0] || "Service"}
      />
      <PopularTitleName name={expert.services[0] || "Unknown Service"} />
      <PopularPriceDisplay
        currency={expert.currency}
        startingPrice={expert.startingPrice}
        priceCaption="Start price"
      />
    </Link>
  );
};

export default ExpertCard;
