"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";

interface UserAvatarProps {
  toggle?: () => void;
}

const UserAvatar = ({ toggle }: UserAvatarProps) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      onClick={toggle}
      className={`flex w-8 h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase ${
        toggle && "cursor-pointer"
      }`}
    >
      {(currentUser?.fullName || currentUser?.userName)?.[0]?.toUpperCase() ||
        "E"}
    </div>
  );
};

export default UserAvatar;
