"use client";

import Link from "next/link";
import Image from "next/image";

import { AnimatePresence } from "framer-motion";

import CartIcon from "../atoms/CartIcon";
import HamburgerIcon from "../atoms/HamburgerIcon";
import Tooltip from "../atoms/Tooltip";
import UserAvatar from "../atoms/UserAvatar";
import NotificationDropdown from "../organisms/NotificationDropdown";
import ProfileDropdown from "../organisms/ProfileDropdown";

import { ROUTES } from "@/lib/constants/routes";

interface DashboardNavIconsProps {
  toggle: () => void;
  handleNotificationDropdown: () => void;
  handleProfileDropdown: () => void;
  openNotification: boolean;
  openProfile: boolean;
}

const DashboardNavIcons = ({
  toggle,
  handleProfileDropdown,
  handleNotificationDropdown,
  openNotification,
  openProfile,
}: DashboardNavIconsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-fit xl:hidden">
        <HamburgerIcon toggle={toggle} />
      </div>
      <div className="w-fit max-xl:hidden cursor-pointer group">
        <Tooltip content="Messages" position="bottom">
          <Link href={ROUTES?.MESSAGES}>
            <Image
              src="/icons/sms.svg"
              alt="menu"
              width={24}
              height={24}
              className="object-contain w-6 h-6"
            />
          </Link>
        </Tooltip>
      </div>
      <div className="w-fit max-xl:hidden cursor-pointer group relative">
        <Tooltip content="Notifications" position="bottom">
          <Image
            src="/icons/notification.svg"
            alt="menu"
            width={24}
            height={24}
            className="object-contain w-6 h-6"
            onClick={handleNotificationDropdown}
          />
        </Tooltip>
        <AnimatePresence>
          {openNotification && <NotificationDropdown />}
        </AnimatePresence>
      </div>
      <CartIcon />
      <div className="relative">
        <UserAvatar toggle={handleProfileDropdown} />
        <AnimatePresence>
          {openProfile && (
            <ProfileDropdown handleOpen={handleProfileDropdown} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardNavIcons;
