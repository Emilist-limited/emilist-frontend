import ProfileImage from "./ProfileImage";

interface ProfileAvatarProps {
  name: string;
  profileImage?: string;
  className?: string;
}

const ProfileAvatar = ({
  name,
  profileImage,
  className = " w-[109px] h-[109px] max-sm:w-[90px] max-sm:h-[90px]",
}: ProfileAvatarProps) => {
  return (
    <div className={`relative ${className}`}>
      {profileImage ? (
        <ProfileImage
          src={profileImage}
          alt="profile picture"
          size={109}
          className="w-full h-full min-h-full min-w-full"
        />
      ) : (
        <p className="min-w-full min-h-full w-full rounded-full bg-slate-200 flex items-center justify-center font-bold text-lg">
          {name[0].toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default ProfileAvatar;
