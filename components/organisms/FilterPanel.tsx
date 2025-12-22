const FilterPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-lg:hidden sticky col-span-3">
      <div className="col-span-3 border-r-1  top-10 bg-white">
        <h4 className="sm:text-2xl font-semibold pb-1 border-b-1 w-full">
          Filter
        </h4>
        {children}
      </div>
    </div>
  );
};

export default FilterPanel;
