import ShowImage from "@/components/molecules/ShowImage";

import { FetchedBusinessImageType } from "../types";

const BusinessImages = ({
  businessImages,
}: {
  businessImages: FetchedBusinessImageType[];
}) => {
  return (
    <div className="space-y-4 sm:px-10 px-4 pb-10">
      <h6 className="font-semibold max-sm:text-sm">Images</h6>
      <div className="flex gap-4 flex-wrap w-full">
        {businessImages?.map((image) => (
          <ShowImage
            key={image?._id}
            alt="business file"
            src={image?.imageUrl}
            size={122}
            extraStyle=" w-[122px] h-[122px] max-sm:w-[67px] max-sm:h-[67px] rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessImages;
