import Image from "next/image";

import CustomButton from "../atoms/CustomButton";
import RatingProfileCard from "../molecules/RatingProfileCard";

import { ROUTES } from "@/lib/constants/routes";

const PrivateExpertSection: React.FC = () => (
  <section className="sm:pb-20 pb-10  padding-ctn">
    <div className="relative w-full flex justify-center items-center max-xl:flex-col sm:gap-6 ">
      <h2 className="text-3xl font-bold max-md:text-lg xl:hidden max-xl:max-w-[770px]">
        EmiList Private Expert
      </h2>
      <div className="flex-1 relative mx-4 w-full max-xl:max-w-[770px] max-xl:mb-6">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/images/workers.svg"
            alt="menu"
            width={408}
            height={460}
            className="object-contain max-lg:w-[80%]"
          />
        </div>
        <RatingProfileCard
          name="Mike Kane"
          rating={4}
          description="Find your project dream team today. Start by browsing profiles of artisans and handymen, and hire the experts who will bring your vision to life."
          profileImage={{
            src: "/dummyImages/profilePic.png",
            alt: "profile picture",
          }}
        />
      </div>
      <div className="flex-1 flex flex-col max-xl:justify-center max-xl:max-w-[770px] gap-4">
        <h2 className="text-3xl font-bold max-xl:hidden">
          EmiList Private Expert
        </h2>
        <p className="max-xl:text-center max-sm:text-sm">
          Hire private investigators, supervisors, project managers, and other
          professionals to facilitate the successful execution of your project.
        </p>
        <div className="w-full flex max-xl:justify-center">
          <CustomButton href={ROUTES?.PRIVATE_EXPERT}>Get Started</CustomButton>
        </div>
      </div>
    </div>
  </section>
);

export default PrivateExpertSection;
