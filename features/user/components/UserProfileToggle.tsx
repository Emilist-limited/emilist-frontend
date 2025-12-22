import { profileLinks } from "../constants";

interface UserProfileToggleProps {
  currentLink: string | number;
  setCurrentLink: (link: string) => void;
}

const UserProfileToggle = ({
  currentLink,
  setCurrentLink,
}: UserProfileToggleProps) => {
  return (
    <ul className="flex items-center gap-4 max-sm:hidden">
      {profileLinks.map((profile) => (
        <li
          key={profile.label}
          onClick={() => setCurrentLink(profile.value)}
          className={`${
            currentLink === profile.value
              ? "text-primary-green  border-b-primary-green border-b-2"
              : "text-[#737774]"
          }  font-semibold capitalize cursor-pointer`}
        >
          {profile.label}
        </li>
      ))}
    </ul>
  );
};

export default UserProfileToggle;
