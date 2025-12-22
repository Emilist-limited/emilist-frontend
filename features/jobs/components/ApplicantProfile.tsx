import Link from "next/link";

import Currency from "@/components/atoms/Currency";
import ProfileAvatar from "@/components/atoms/ProfileAvatar";
import StatusBubble from "@/components/atoms/StatusBubble";
import Rating from "@/components/molecules/Rating";

import { ROUTES } from "@/lib/constants/routes";
import { numberWithCommas } from "@/lib/helpers";

interface ApplicantProfileProps {
  isNotAcceptedApplicant: boolean;
  profileImage?: string;
  name: string;
  level: string;
  rating: number;
  currency: string;
  type: string;
  maximumPrice?: number;
  applicantOrJobOwner: boolean;
  businessId?: string;
  status: string;
  userId?: string;
}

const ApplicantProfile = ({
  status,
  businessId,
  isNotAcceptedApplicant,
  profileImage,
  name,
  level,
  rating,
  currency,
  type,
  userId,
  maximumPrice,
  applicantOrJobOwner,
}: ApplicantProfileProps) => {
  return (
    <Link
      href={
        businessId
          ? ROUTES?.DASHBOARD_SERVICE_INFO(businessId)
          : ROUTES?.PUBLIC_USER_PROFILE(userId || "")
      }
      className={`flex-1 flex gap-1 w-full ${
        isNotAcceptedApplicant && "opacity-30"
      }`}
    >
      <ProfileAvatar
        className="w-10 h-10 max-sm:w-8 max-sm:h-8"
        profileImage={profileImage}
        name={name}
      />
      <div className="flex-1 flex flex-col gap-1">
        <h6 className="font-medium max-sm:text-sm truncate group-hover:text-primary-green duration-300 transition-all">
          {name}
        </h6>
        <div className="flex items-center text-[#5E625F] text-sm whitespace-nowrap">
          {level} | <Rating rating={rating} size={16} className="w-4 h-4" />
        </div>
        {type === "biddable" && (
          <h6 className="text-sm font-medium max-sm:text-xs">
            Bid price: <Currency currency={currency} />
            {maximumPrice && numberWithCommas(maximumPrice)}
          </h6>
        )}

        {applicantOrJobOwner && <StatusBubble status={status} />}
      </div>
    </Link>
  );
};

export default ApplicantProfile;
