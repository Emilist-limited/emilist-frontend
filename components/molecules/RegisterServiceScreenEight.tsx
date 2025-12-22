import RegisterServiceDescription from "../atoms/RegisterServiceDescription";
import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import NavigationButtons from "./NavigationButtons";
import UploadBusinessCoverageArea from "./UploadBusinessCoverageArea";

interface RegisterServiceScreenEightProps {
  prevScreen: () => void;
  coverageArea: string[];
  setCoverageArea: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
}

const RegisterServiceScreenEight = ({
  prevScreen,
  coverageArea,
  setCoverageArea,
  isSubmitting,
  handleSubmit,
}: RegisterServiceScreenEightProps) => {
  return (
    <div
      id="area-coverage"
      className="w-full pt-24 pb-14 space-y-4 sm:px-10 px-4"
    >
      <RegisterServiceTitle title="Service coverage area" />
      <RegisterServiceDescription>
        Use the options provided below to designate the service area(s) for your
        business.
      </RegisterServiceDescription>
      <UploadBusinessCoverageArea
        coverageArea={coverageArea}
        setCoverageArea={setCoverageArea}
      />
      <NavigationButtons
        prevHref="#insurance"
        onPrev={prevScreen}
        onSubmit
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isAllInputFilled={coverageArea?.length > 0}
      />
    </div>
  );
};

export default RegisterServiceScreenEight;
