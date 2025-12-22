import GeneralSearchForm from "../molecules/GeneralSearchForm";
import Heading from "../atoms/Heading";

interface FeatureContentHeaderProps {
  title: string;
  description: string;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FeatureContentHeader = ({
  title,
  description,
  search,
  handleSearchChange,
  handleSearchSubmit,
}: FeatureContentHeaderProps) => {
  return (
    <section className="w-full">
      <div className="flex md:items-end sm:gap-10 gap-4 max-md:flex-col">
        <div className="flex flex-col sm:gap-4 gap-2 flex-1">
          <Heading text={title} className="sm:text-4xl text-lg" />
          <p className="max-sm:text-sm">{description}</p>
        </div>
        <div className="flex-1 w-full flex justify-end">
          <GeneralSearchForm
            onSubmit={handleSearchSubmit}
            search={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureContentHeader;
