import CartIcon from "../atoms/CartIcon";
import HamburgerIcon from "../atoms/HamburgerIcon";

interface MobileNavProps {
  toggle: () => void;
}

const MobileNav = ({ toggle }: MobileNavProps) => (
  <div className="flex items-center gap-4 lg:hidden">
    <CartIcon />
    <HamburgerIcon toggle={toggle} />
  </div>
);

export default MobileNav;
