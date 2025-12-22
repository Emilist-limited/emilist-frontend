"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import LightGreenLayout from "@/components/templates/LightGreenLayout";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileInfo from "./UserProfileInfo";
import UserSecurity from "./UserSecurity";
import BankDetails from "./BankDetails";
import UserNotification from "./UserNotification";

const UserProfileWrapper = () => {
  const [currentLink, setCurrentLink] = useState<string | number>(
    "Personal Profile"
  );

  return (
    <LightGreenLayout>
      <div className="py-10">
        <div className="sm:px-10 px-4 py-6 bg-white rounded-lg">
          <UserProfileHeader
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          />
          <div className="pt-6">
            <AnimatePresence mode="wait" initial={false}>
              {currentLink === "Personal Profile" && <UserProfileInfo />}
              {currentLink === "Security & Password" && <UserSecurity />}
              {currentLink === "Message & Notification" && <UserNotification />}
              {currentLink === "Bank Details" && <BankDetails />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LightGreenLayout>
  );
};

export default UserProfileWrapper;
