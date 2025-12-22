import CustomDropdown from "@/components/molecules/CustomDropdown";
import UserProfileToggle from "./UserProfileToggle";

import { profileLinks } from "../constants";

interface UserProfileHeaderProps {
  currentLink: string | number;
  setCurrentLink: (link: string | number) => void;
}

const UserProfileHeader = ({
  currentLink,
  setCurrentLink,
}: UserProfileHeaderProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold  max-sm:text-lg">Profile</h2>
      <UserProfileToggle
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
      />
      <div className="sm:hidden">
        <CustomDropdown
          options={profileLinks}
          value={currentLink}
          onChange={setCurrentLink}
        />
      </div>
    </div>
  );
};

export default UserProfileHeader;
