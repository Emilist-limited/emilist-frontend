"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface linksType {
  id: number;
  link: string;
  name: string;
}

interface DashboardNavToggleProps {
  links: linksType[];
}

const DashboardNavToggle = ({ links }: DashboardNavToggleProps) => {
  const pathname = usePathname();

  return (
    <ul className="flex-c gap-4 overflow-x-auto hide-scrollbar">
      {links.map((link: linksType) => (
        <Link
          href={link.link}
          key={link.id}
          className={`${
            pathname === link.link
              ? "text-primary-green  border-b-primary-green border-b-1"
              : "text-[#737774]"
          }  font-semibold capitalize max-sm:text-sm`}
        >
          <li>{link.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default DashboardNavToggle;
