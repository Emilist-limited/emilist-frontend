import { Capitalize } from "@/lib/helpers";

const PopularJobTitle: React.FC<{ title: string }> = ({ title }) => (
  <h6 className="font-bold truncate text-lg group-hover:text-primary-green transition-all duration-300">
    {title && Capitalize(title)}
  </h6>
);

export default PopularJobTitle;
