import Image from "next/image";

const ProfileImageGuide = () => {
  return (
    <div className="col-span-2 max-md:col-span-2 max-lg:hidden max-md:flex max-sm:hidden">
      <div className="w-full shadow-lg flex flex-col justify-center py-5 rounded-lg border-l-8 border-primary-green px-4">
        <h3 className="text-lg font-medium">Photo Tips</h3>
        <ul className="py-3 px-4 list-disc flex flex-col gap-2">
          <li className="max-sm:text-sm">
            A photo of your face works better than a logo
          </li>
          <li className="max-sm:text-sm">Make sure to smile.</li>
          <li className="max-sm:text-sm">Try to use a solid background</li>
        </ul>
        <div className="w-full">
          <Image
            src="/images/profilePicGuide.svg"
            alt="upload"
            width={88}
            height={88}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageGuide;
