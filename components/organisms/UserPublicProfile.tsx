import LevelDisplay from "../atoms/LevelDisplay";
import ProfileImage from "../atoms/ProfileImage";
import ProfileInitial from "../atoms/ProfileInitial";
import UserName from "../atoms/UserName";
import UserRatingDisplay from "../molecules/UserRatingDisplay";

interface UserPublicProfileProps {
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  level?: string;
  rating?: number;
  totalReviews?: number;
  size: number;
  responsiveClasses: string;
}

const UserPublicProfile = ({
  profileImage,
  firstName,
  lastName,
  userName,
  level,
  rating,
  totalReviews,
  responsiveClasses,
  size,
}: UserPublicProfileProps) => {
  const userInitial = firstName
    ? firstName?.charAt(0)
    : userName
    ? userName?.charAt(0)
    : "E";

  return (
    <div className="flex gap-1">
      {profileImage ? (
        <ProfileImage
          src={profileImage}
          alt="Owner profile picture"
          size={size}
          className={responsiveClasses}
        />
      ) : (
        <ProfileInitial initial={userInitial} className={responsiveClasses} />
      )}
      <div className="flex-1 w-full">
        <UserName
          firstName={firstName}
          lastName={lastName}
          userName={userName}
        />
        <div className="w-full flex items-center">
          <LevelDisplay level={level} />
          <UserRatingDisplay rating={rating} totalReviews={totalReviews} />
        </div>
      </div>
    </div>
  );
};

export default UserPublicProfile;
