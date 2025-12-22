import Image from "next/image";

import { useAddMaterialToCart } from "@/features/cart/hooks/useAddMaterialToCart";
import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import CustomButton from "@/components/atoms/CustomButton";

const CompareMaterialHeader = ({ material }: { material: any }) => {
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();

  return (
    <div className="w-full h-[330px] border-b-1 px-2 py-6">
      {cartLoading && <WhiteBgLoader />}
      {Array.isArray(material?.images) && material?.images[0]?.imageUrl ? (
        <Image
          src={material?.images[0]?.imageUrl}
          alt={material?.name}
          width={380}
          height={276}
          className="object-cover min-w-full h-[170px] "
        />
      ) : (
        <Image
          src="/images/Logo.svg"
          alt={material?.name}
          width={130}
          height={30}
          className="object-contain min-w-full  h-[170px] border-1 "
        />
      )}
      <div className="mt-2">
        <div className="flex justify-between gap-1">
          <div className="">
            <h3
              className={`text-lg font-bold text-primary-green  ${
                material?.isDiscounted && "opacity-35 line-through"
              }`}
            >
              {material?.currency && getCurrencySign(material?.currency)}
              {material?.price ? numberWithCommas(material?.price) : 0}
            </h3>
            {material?.isDiscounted && (
              <h3 className="lg:text-lg font-bold text-primary-green">
                {" "}
                {material?.currency && getCurrencySign(material?.currency)}
                {material?.discountedPrice &&
                  numberWithCommas(material?.discountedPrice)}
              </h3>
            )}
          </div>

          <CustomButton onClick={() => addMaterialToCart(material?._id)}>
            Add to cart
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CompareMaterialHeader;
