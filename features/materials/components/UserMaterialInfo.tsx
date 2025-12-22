import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { Material } from "../types";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

import MaterialMetaData from "./MaterialMetaData";

interface UserMaterialInfoProps {
  materialInfo: Material | null;
}

const UserMaterialInfo = ({ materialInfo }: UserMaterialInfoProps) => {
  return (
    <section className="p-6 border-b border-[#D0CFCF] max-sm:p-4 space-y-4">
      <MaterialMetaData
        title="Product Id"
        value={materialInfo?.product?._id || "N/A"}
      />
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-4">
          <MaterialMetaData
            title="Quantity"
            value={
              numberWithCommas(materialInfo?.product?.availableQuantity || 0) ||
              "N/A"
            }
          />
          <MaterialMetaData
            title="Brand"
            value={Capitalize(materialInfo?.product?.brand || "") || "N/A"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <MaterialMetaData
            title="Price"
            value={`
                ${
                  materialInfo?.product?.currency &&
                  getCurrencySign(materialInfo?.product?.currency)
                }${numberWithCommas(materialInfo?.product?.price || 0) || "N/A"}
                `}
          />
          <MaterialMetaData
            title="Discount Price"
            value={`
              ${
                materialInfo?.product?.currency &&
                getCurrencySign(materialInfo?.product?.currency)
              }${
              numberWithCommas(materialInfo?.product?.discountedPrice || 0) ||
              "N/A"
            }
            `}
          />
        </div>
        <div className="flex flex-col gap-4">
          <MaterialMetaData
            title="Category"
            value={Capitalize(materialInfo?.product?.category || "") || "N/A"}
          />
          <MaterialMetaData
            title="Sub-Category"
            value={
              Capitalize(materialInfo?.product?.subCategory || "") || "N/A"
            }
          />
        </div>
      </div>
      <p className="max-sm:text-sm">{materialInfo?.product?.description}</p>
    </section>
  );
};

export default UserMaterialInfo;
