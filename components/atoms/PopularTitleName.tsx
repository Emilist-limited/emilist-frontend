import { Capitalize } from "@/lib/helpers";

const PopularTitleName = ({ name }: { name: string }) => {
  return (
    <h4 className="w-full font-medium sm:text-xl group-hover:text-primary-green transition-all duration-300 ease-out">
      {Capitalize(name)}
    </h4>
  );
};

export default PopularTitleName;
