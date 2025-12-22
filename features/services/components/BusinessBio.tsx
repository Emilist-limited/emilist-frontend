import ReadMore from "@/components/molecules/ReadMore";

const BusinessBio = ({ bio }: { bio: string }) => {
  return (
    <div className="sm:px-10 px-4 py-6 space-y-4">
      <h6 className="font-semibold max-sm:text-sm">Business bio</h6>
      <ReadMore maxLength={300} text={bio} />
    </div>
  );
};

export default BusinessBio;
