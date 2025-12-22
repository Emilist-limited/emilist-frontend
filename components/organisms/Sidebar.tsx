import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";

import NavLink from "../atoms/NavLink";
import SidebarLayout from "../templates/SidebarLayout";
import LogoutButton from "../atoms/LogoutButton";

const Sidebar = ({ toggle }: { toggle: () => void }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <SidebarLayout toggle={toggle}>
      <ul className="flex flex-col text-gray-600 pt-12 gap-2">
        <li className="border-b-1 py-2">
          <NavLink href={ROUTES.JOIN_EXPERT}>Join as Expert</NavLink>
        </li>
        <li className="border-b-1 py-2">
          <NavLink href={ROUTES.LIST_NEW_JOB}>List New Job</NavLink>
        </li>
        {currentUser ? (
          <>
            <li className="border-b-1 py-2">
              <NavLink href={ROUTES?.DASHBOARD_JOB}>Dashboard</NavLink>
            </li>
            <LogoutButton />
          </>
        ) : (
          <>
            <li className="border-b-1 py-2">
              <NavLink href={ROUTES?.LOGIN}>Login</NavLink>
            </li>
            <li className="border-b-1 py-2">
              <NavLink href={ROUTES?.SIGN_UP}>Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
    </SidebarLayout>
  );
};

export default Sidebar;
