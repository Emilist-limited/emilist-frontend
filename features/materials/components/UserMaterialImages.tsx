import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import ShowImage from "@/components/molecules/ShowImage";

interface imageUrlTyoe {
  imageUrl: string;
}

interface UserMaterialImagesProps {
  productImages: imageUrlTyoe[] | null;
}

const UserMaterialImages = ({ productImages }: UserMaterialImagesProps) => {
  return (
    <div className="p-6 space-y-4">
      <h6 className="sm:text-lg font-medium">Images</h6>
      <div className="flex gap-4 flex-wrap pb-6">
        {productImages ? (
          productImages?.map((image: imageUrlTyoe, index: number) => (
            <ShowImage
              src={image?.imageUrl}
              key={index}
              alt="product-image"
              extraStyle="w-28 h-28 rounded-lg"
            />
          ))
        ) : (
          <NoMoreMessage message="No images available for this material." />
        )}
      </div>
    </div>
  );
};

export default UserMaterialImages;
