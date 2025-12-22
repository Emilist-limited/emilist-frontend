import CompareText from "../atoms/CompareText";

const CompareServicesList = ({ services }: { services: string[] }) => (
  <div className="px-2 py-6 border-b flex overflow-x-auto h-20">
    {services?.map((service, index) => (
      <CompareText key={index} className="pl-1 whitespace-nowrap">
        {service}
        {index + 1 !== services?.length && ", "}
      </CompareText>
    ))}
  </div>
);

export default CompareServicesList;
