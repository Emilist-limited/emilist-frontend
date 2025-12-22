import CompareText from "../atoms/CompareText";

const CompareLanguagesList = ({ languages }: { languages: string[] }) => (
  <div className="px-2 py-6 border-b flex overflow-x-auto h-20">
    {languages?.map((language, index) => (
      <CompareText key={index} className="whitespace-nowrap">
        {language}
        {index + 1 !== languages?.length && ", "}
      </CompareText>
    ))}
  </div>
);

export default CompareLanguagesList;
