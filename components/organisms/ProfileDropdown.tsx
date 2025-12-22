import Image from "next/image";
import { useContext } from "react";

import { motion } from "framer-motion";

import { AuthContext } from "@/lib/context/AuthState";

import ProfileDropdownHeader from "../molecules/ProfileDropdownHeader";
import ProfileNavigationMenu from "../molecules/ProfileNavigationMenu";

type Props = {
  handleOpen: () => void;
};

const ProfileDropdown = ({ handleOpen }: Props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute max-w-[280px] w-[280px] min-w-[260px] bg-white -right-10 h-[500px] top-full max-sm:right-6 shadow border-1"
    >
      <div className="relative">
        <Image
          src="/images/profileBanner.png"
          width={300}
          height={86}
          alt="banner"
          className="w-full max-h-[86px] h-[86px] min-h-[80px]"
        />
        <div className="absolute w-full flex justify-center flex-col items-center top-12">
          <ProfileDropdownHeader user={currentUser || {}} />
          <ProfileNavigationMenu handleOpen={handleOpen} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
