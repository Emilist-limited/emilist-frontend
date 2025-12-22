import { Capitalize } from "@/lib/helpers";

import ProfileImage from "../atoms/ProfileImage";
import StatusIndicator from "../atoms/StatusIndicator";
import LevelDisplay from "../atoms/LevelDisplay";
import UserRatingDisplay from "./UserRatingDisplay";
import CustomButton from "../atoms/CustomButton";

interface BusinessHeaderProps {
  firstName?: string;
  lastName?: string;
  profileImage: string;
  isOnline?: boolean;
  level?: string;
  rating?: number;
  totalReviews?: number;
  handleOpenModal: () => void;
  isBusinessOwnerCurrentUser?: boolean;
}

const BusinessHeader = ({
  firstName,
  lastName,
  profileImage,
  isOnline = true,
  level,
  rating,
  totalReviews,
  handleOpenModal,
  isBusinessOwnerCurrentUser = false,
}: BusinessHeaderProps) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4">
    <ProfileImage
      src={profileImage}
      alt={`${firstName || "Seller"}'s profile picture`}
      className="w-[114px] h-[114px] max-sm:w-[70px] max-sm:h-[70px]"
    />
    <div className="flex-1">
      <div className="flex items-center gap-4 flex-wrap">
        <h3 className="text-2xl font-semibold sm:font-bold">
          {firstName ? Capitalize(firstName) : "Anonymous"}{" "}
          {lastName && Capitalize(lastName)}
        </h3>
        <StatusIndicator isOnline={isOnline} />
      </div>
      <div className="flex items-center">
        <LevelDisplay level={level} />
        <UserRatingDisplay rating={rating} totalReviews={totalReviews} />
      </div>

      {!isBusinessOwnerCurrentUser && (
        <CustomButton onClick={handleOpenModal}>Contact Me</CustomButton>
      )}
    </div>
  </div>
);
export default BusinessHeader;
