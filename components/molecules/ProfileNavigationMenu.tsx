import NavLink from "../atoms/NavLink";
import LogoutButton from "../atoms/LogoutButton";

import { ROUTES } from "@/lib/constants/routes";

const ProfileNavigationMenu = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-[#303632]">
      <NavLink
        href={ROUTES?.USER_PROFILE}
        onClick={handleOpen}
        hoverEnabled={false}
      >
        Profile
      </NavLink>
      <NavLink
        href={ROUTES?.SUBSCRIPTION_PLANS}
        onClick={handleOpen}
        hoverEnabled={false}
      >
        Subscriptions
      </NavLink>
      <NavLink href={ROUTES?.REPORTS} onClick={handleOpen} hoverEnabled={false}>
        Reports
      </NavLink>
      <NavLink href={ROUTES?.WALLET} onClick={handleOpen} hoverEnabled={false}>
        My Wallet
      </NavLink>
      <NavLink
        href={ROUTES?.TRANSACTIONS}
        onClick={handleOpen}
        hoverEnabled={false}
      >
        Transactions
      </NavLink>
      <LogoutButton />
    </div>
  );
};

export default ProfileNavigationMenu;
