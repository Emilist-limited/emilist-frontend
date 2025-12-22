"use client";

import DynamicNav from "../molecules/DynamicNav";
import RegistrationGuide from "../molecules/RegistrationGuide";
import UserAvatar from "../atoms/UserAvatar";

const RegisterServiceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DynamicNav bg>
        <UserAvatar />
      </DynamicNav>
      <div className="max-lg:hidden">
        <RegistrationGuide />
      </div>
      {children}
    </div>
  );
};

export default RegisterServiceLayout;
