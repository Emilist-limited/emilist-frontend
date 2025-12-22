import { FC } from "react";

import MenuLink from "../atoms/MenuLink";

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

const MenuItem: FC<MenuItemProps> = ({ label, onClick, href }) => {
  return (
    <li className="xl:w-1/4 lg:w-1/3 w-1/2 py-2">
      <MenuLink href={href} onClick={onClick}>
        {label}
      </MenuLink>
    </li>
  );
};

export default MenuItem;
