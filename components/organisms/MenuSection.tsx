import { FC } from "react";

import MenuItem from "../molecules/MenuItem";

interface MenuSectionProps {
  title: string;
  items: string[];
  type: "service" | "job" | "link";
  onItemClick?: (item: string) => void;
  href?: string;
}

const MenuSection: FC<MenuSectionProps> = ({
  title,
  items,
  type,
  onItemClick,
  href,
}) => (
  <div className="flex flex-col gap-4 py-4">
    <h2 className="text-lg w-full pb-2 font-semibold">{title}</h2>
    <ul className="flex items-center flex-wrap">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          label={item}
          onClick={type !== "link" ? () => onItemClick?.(item) : undefined}
          href={type === "link" ? href : undefined}
        />
      ))}
    </ul>
  </div>
);
export default MenuSection;
