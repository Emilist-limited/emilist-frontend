import { User } from "@/types";
import { mapExpertLevel } from "@/lib/helpers/mapExpertLevel";

import LevelBadge from "../atoms/LevelBadge";
import ProfileAvatar from "../atoms/ProfileAvatar";
import Rating from "./Rating";

const ProfileDropdownHeader = ({ user }: { user: User }) => {
  return (
    <>
      <div className="relative">
        <ProfileAvatar
          name={user?.fullName || user?.userName || "E"}
          profileImage={user?.profileImage}
        />
        <LevelBadge
          level={mapExpertLevel(user?.level) || 5}
          className="absolute bottom-0 py-1 left-4 px-4 max-sm:left-2"
        />
      </div>
      <div className="flex items-center gap-1 my-8">
        <Rating rating={4} />
      </div>
    </>
  );
};

export default ProfileDropdownHeader;
