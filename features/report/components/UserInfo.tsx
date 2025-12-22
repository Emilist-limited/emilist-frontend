"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";

const UserInfo = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex-c gap-2 px-10">
      <div className="flex w-8 h-8 min-w-8 min-h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase relative cursor-pointer my-2">
        {currentUser?.fullName
          ? currentUser?.fullName[0].toUpperCase()
          : currentUser?.userName[0].toUpperCase()}
      </div>
      <div className="text-xs">
        <p>
          {" "}
          {currentUser?.fullName
            ? currentUser?.fullName
            : currentUser?.userName}
        </p>
        <p> {currentUser?.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
