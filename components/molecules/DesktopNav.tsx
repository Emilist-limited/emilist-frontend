import CartIcon from "../atoms/CartIcon";
import NavLinks from "./NavLinks";

interface DesktopNavProps {
  isAuthenticated: boolean;
}

const DesktopNav = ({ isAuthenticated }: DesktopNavProps) => (
  <div className="hidden lg:flex items-center space-x-6">
    <NavLinks isAuthenticated={isAuthenticated} />
    <CartIcon />
  </div>
);

export default DesktopNav;
