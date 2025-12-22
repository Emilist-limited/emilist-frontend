import CompareText from "../atoms/CompareText";

const CompareBusinessTableHeader = () => {
  return (
    <div className="absolute left-0 sm:w-52 w-28 bg-white flex flex-col font-semibold max-sm:text-sm">
      <div className="w-full h-[330px] border-b py-6" />
      <CompareText className="py-6">Level</CompareText>
      <CompareText className="py-6 h-[200px]">About</CompareText>
      <CompareText className="py-6">Ratings</CompareText>
      <CompareText className="py-6">Reviews</CompareText>
      <CompareText className="py-6 h-20">Service</CompareText>
      <CompareText className="py-6">Job completed</CompareText>
      <CompareText className="py-6">Notice period</CompareText>
      <CompareText className="py-6">Location</CompareText>
      <CompareText className="py-6 h-20">Language</CompareText>
    </div>
  );
};

export default CompareBusinessTableHeader;
