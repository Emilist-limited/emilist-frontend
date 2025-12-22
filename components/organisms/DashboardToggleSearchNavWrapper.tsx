import { dashboardLinks } from "@/lib/constants";

import CustomButton from "../atoms/CustomButton";
import DashboardNavToggle from "../molecules/DashboardNavToggle";
import GeneralSearchForm from "../molecules/GeneralSearchForm";

interface DashboardToggleSearchNavWrapperProps {
  link?: string;
  linkTitle?: string;
  description: string;
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DashboardToggleSearchNavWrapper = ({
  link,
  search,
  linkTitle,
  description,
  handleChange,
  handleSubmit,
}: DashboardToggleSearchNavWrapperProps) => {
  return (
    <div className="p-6 bg-white rounded-t-lg max-sm:px-3 border-b-1 border-[#B8B9B8]">
      <h2 className="capitalize text-2xl font-medium max-sm:text-lg">
        Explore Emilist
      </h2>
      <div className="flex flex-col space-y-6 w-full gap-4 ">
        <div className="flex-c-b w-full max-md:flex-col max-md:items-start md:gap-2 gap-4">
          <DashboardNavToggle links={dashboardLinks} />
          {link && <CustomButton href={link}>{linkTitle}</CustomButton>}
        </div>
        <div className="flex justify-between w-full sm:gap-8 gap-4 max-md:flex-col">
          <p className="flex-1 max-sm:text-sm">{description}</p>
          <div className="flex-1 w-full">
            <GeneralSearchForm
              onSubmit={handleSubmit}
              search={search}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToggleSearchNavWrapper;
