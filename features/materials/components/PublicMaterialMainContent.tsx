import Link from "next/link";

import ImageSlider from "@/components/molecules/Sliders/ImageSlider";
import Rating from "@/components/molecules/Rating";

import { Material } from "../types";
import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { ROUTES } from "@/lib/constants/routes";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

interface PublicMaterialMainContentProps {
  userId: string;
  materialInfo: Material;
  addMaterialToCart: () => Promise<void>;
}

const PublicMaterialMainContent = ({
  materialInfo,
  addMaterialToCart,
  userId,
}: PublicMaterialMainContentProps) => {
  return (
    <section className="py-10">
      <div className="flex gap-10 flex-wrap w-full max-w-full overflow-x-hidden">
        <ImageSlider images={materialInfo?.product?.images} />
        <div className="flex-1 w-full max-w-2xl sm:min-w-90">
          <h4 className="sm:text-3xl text-lg font-bold mb-4">
            {materialInfo?.product?.name &&
              Capitalize(materialInfo?.product?.name)}
          </h4>
          <div className="flex flex-col gap-2 font-inter">
            <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
              <div className="flex-c gap-2 flex-1">
                <h6 className="font-medium max-sm:text-sm">Brand:</h6>
                <p className=" max-sm:text-sm">
                  {materialInfo?.product?.brand &&
                    Capitalize(materialInfo?.product?.brand)}
                </p>
              </div>
              <div className="flex-c gap-2 flex-1">
                <h6 className="font-medium max-sm:text-sm">Supplier:</h6>
                <Link
                  href={ROUTES?.PUBLIC_USER_PROFILE(
                    materialInfo?.product?.userId?._id || ""
                  )}
                  className="text-primary-green underline  max-sm:text-sm"
                >
                  {materialInfo?.product?.userId?.fullName ||
                    materialInfo?.product?.userId?.userName}
                </Link>
              </div>
            </div>
            <div className="flex justify-between gap-2 max-sm:flex-col ">
              <div className="flex-c gap-2 flex-1">
                <h6 className="font-medium max-sm:text-sm">Category:</h6>
                <p className="max-sm:text-sm">
                  {materialInfo?.product?.category}
                </p>
              </div>
              <div className="flex-c gap-5 flex-1">
                <h6 className="font-medium max-sm:text-sm">Rating</h6>
                <div className="flex-c text-[#8A8D8B] max-sm:text-sm gap-1">
                  <Rating rating={materialInfo?.averageRating | 0} />
                  {materialInfo?.averageRating || 0}
                </div>
              </div>
            </div>
            <div className="flex-c gap-2 flex-1">
              <h6 className="font-medium max-sm:text-sm">Location:</h6>
              <p className="max-sm:text-sm">
                {materialInfo?.product?.location}
              </p>
            </div>
          </div>
          <h3
            className={`lg:text-lg font-bold text-primary-green  mt-5 ${
              materialInfo?.product?.isDiscounted && "opacity-35 line-through"
            }`}
          >
            {materialInfo?.product?.currency &&
              getCurrencySign(materialInfo?.product?.currency)}
            {materialInfo?.product?.price &&
              numberWithCommas(materialInfo?.product?.price)}
          </h3>
          {materialInfo?.product?.isDiscounted && (
            <h3 className="lg:text-lg font-bold text-primary-green  mt-5">
              {materialInfo?.product?.currency &&
                getCurrencySign(materialInfo?.product?.currency)}
              {materialInfo?.product?.discountedPrice &&
                numberWithCommas(materialInfo?.product?.discountedPrice)}
            </h3>
          )}
          <p className="font-medium max-sm:text-sm mt-2 ">Price</p>
          {materialInfo?.product?.userId?._id !== userId && (
            <button
              className="bg-primary-green px-6 py-5 text-white rounded-lg font-bold mt-10 whitespace-nowrap max-lg:mt-5 max-sm:text-sm max-sm:py-3 w-full hover:bg-green-600 transition-all duration-300"
              onClick={addMaterialToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicMaterialMainContent;
