import AppImage from "../atoms/AppImage";
import AppStoreLinks from "../molecules/AppStoreLinks";

const MobileAppSection = () => {
  return (
    <section className="padding-y padding-ctn">
      <div className="bg-[#054753] sm:py-14 py-8 rounded-xl flex items-center max-xl:flex-col">
        <div className="flex-1 flex flex-col max-xl:items-center pl-10 max-xl:w-full max-xl:px-2 max-xl:max-w-[770px]">
          <h5 className="text-white text-3xl font-bold max-xl:text-center max-sm:text-lg">
            Manage your projects from your mobile
          </h5>
          <p className="text-white sm:text-lg my-6 max-xl:text-center font-inter">
            Download the app to manage your projects, keep track of the progress
            and complete tasks without procrastinating. Stay on track and
            complete on time!
          </p>
          <div className="xl:hidden flex justify-center">
            <AppImage
              src="/images/phone.png"
              alt="logo"
              width={354}
              height={372}
              className="object-cover w-[350px] rounded-lg h-[372px]"
            />
          </div>
          <h6 className="text-white sm:text-lg font-semibold mb-3">
            GET THE APP
          </h6>
          <div className="w-fit">
            <AppStoreLinks />
          </div>
        </div>
        <div className="flex-1 relative max-xl:hidden">
          <AppImage
            src="/images/phone.png"
            alt="logo"
            width={700}
            height={500}
            className="absolute object-cover -bottom-[300px] w-full rounded-lg h-[600px] max-md:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
