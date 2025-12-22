import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { Product } from "../types";

interface PublicMaterialDetailsProps {
  productInfo: Product;
}

const PublicMaterialDetails = ({ productInfo }: PublicMaterialDetailsProps) => {
  return (
    <section className="sm:pb-10 pb-6">
      <h5 className="sm:text-xl font-semibold">Product Details</h5>
      <p className="max-sm:text-sm max-w-xl w-full sm:pt-5 sm:pb-10 pt-2 pb-6">
        {productInfo?.description && productInfo?.description}
      </p>
      <h5 className="sm:text-xl font-semibold">Specification</h5>
      <div className="max-w-sm py-5">
        <div className="flex gap-4">
          <h6 className="flex-1 font-semibold max-sm:text-sm">Brand:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {productInfo?.brand && Capitalize(productInfo?.brand)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-semibold max-sm:text-sm">Category:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {productInfo?.category && Capitalize(productInfo?.category)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-semibold max-sm:text-sm">Sub category:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {productInfo?.subCategory && Capitalize(productInfo?.subCategory)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-semibold max-sm:text-sm">
            Quantity avaliable:
          </h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {productInfo?.availableQuantity &&
              numberWithCommas(productInfo?.availableQuantity)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-semibold max-sm:text-sm">Store name:</h6>
          <p className="flex-1 max-sm:text-sm"> {productInfo?.storeName}</p>
        </div>
      </div>
    </section>
  );
};

export default PublicMaterialDetails;
