const ServiceCoverage = ({ coverageArea }: { coverageArea: string[] }) => {
  return (
    <div className="bg-white rounded-lg py-6 sm:px-10 px-4 space-y-4">
      <h5 className="font-semibold max-sm:text-sm">Service Coverage</h5>
      <ul className=" flex flex-col  gap-5 list-disc pl-4 text-[#303632]">
        {coverageArea?.map((area: string, index: number) => (
          <li key={index} className="max-sm:text-xs">
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCoverage;
