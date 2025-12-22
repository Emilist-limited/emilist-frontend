import { ShowToastFunction } from "@/types";

import RegisterServiceDescription from "../atoms/RegisterServiceDescription";
import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import ProfileImageGuide from "./ProfileImageGuide";
import RegisterServiceProfileImageInput from "./RegisterServiceProfileImageInput";
import NavigationButtons from "./NavigationButtons";

interface RegisterServiceScreenThreeProps {
  setProfileImage: (image: File | null) => void;
  fetchProfileImage: string;
  setFetchedProfileImage: (image: string) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  showToast: ShowToastFunction;
}

const RegisterServiceScreenThree = ({
  setProfileImage,
  fetchProfileImage,
  setFetchedProfileImage,
  nextScreen,
  prevScreen,
  showToast,
}: RegisterServiceScreenThreeProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInMB = 2 * 1024 * 1024; //2MB

      if (file.size > maxSizeInMB) {
        showToast({
          message: "File exceeds the 3MB size limit.",
          type: "error",
          duration: 8000,
        });
        return;
      }

      if (!validExtensions.includes(file.type)) {
        showToast({
          message:
            "Unsupported file type. Only jpg, jpeg, and png are allowed.",
          type: "error",
          duration: 8000,
        });
        return;
      }

      setProfileImage(file);
      setFetchedProfileImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setProfileImage(null);
    setFetchedProfileImage("");
  };

  const handleProceed = () => {
    if (!fetchProfileImage) {
      showToast({
        message: "Please provide a profile image",
        type: "error",
        duration: 8000,
      });
      return;
    }
    nextScreen();
  };

  return (
    <div
      id="expert-profile-pic"
      className="w-full pt-24 pb-14 space-y-4 sm:px-10 px-4 max-w-4xl h-fit"
    >
      <RegisterServiceTitle title="Add your profile photo" />
      <RegisterServiceDescription>
        Upload the best business pictures here.
      </RegisterServiceDescription>
      <div className="grid grid-cols-5 gap-6 w-full">
        <RegisterServiceProfileImageInput
          profileImage={fetchProfileImage}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        <ProfileImageGuide />
      </div>
      <NavigationButtons
        prevHref="#expert-profil"
        onPrev={prevScreen}
        nextHref="#business-profile"
        onNext={handleProceed}
      />
    </div>
  );
};

export default RegisterServiceScreenThree;
