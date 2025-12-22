import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { UserProfileLinkProps } from "@/types";

import ProfileImage from "../atoms/ProfileImage";

const UserProfileLink: React.FC<UserProfileLinkProps> = ({ user }) => {
  return (
    <Link
      href={ROUTES?.PUBLIC_USER_PROFILE(user?._id)}
      className="flex items-center gap-2 group"
    >
      {user.profileImage ? (
        <ProfileImage
          src={user?.profileImage}
          alt={user?.userName}
          className="h-8 w-8"
        />
      ) : (
        <p className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold">
          {(user.fullName || user.userName)[0].toUpperCase()}
        </p>
      )}
      <h6 className="sm:text-sm text-xs group-hover:text-primary-green duration-300 transition-all">
        {user.fullName || user.userName}
      </h6>
    </Link>
  );
};

export default UserProfileLink;
