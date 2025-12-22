import { Material } from "@/types";
import MaterialViewCardDesktop from "./MaterialViewCardDesktop";
import MaterialViewCardMobile from "./MaterialViewCardMobile";

interface MaterialCardProps {
  material: Material;
  addMaterialToCart?: (id: string) => void;
  handleSaveMaterial?: (id: string) => void;
  handleUnsaveMaterial?: (id: string) => void;
  handleCompare?: (id: string) => void;
  isShadow?: boolean;
  myMaterials?: boolean;
  autoLike?: boolean;
}

const MaterialViewCard: React.FC<MaterialCardProps> = ({
  material,
  addMaterialToCart,
  handleSaveMaterial,
  handleUnsaveMaterial,
  handleCompare,
  isShadow = true,
  myMaterials = false,
  autoLike = false,
}) => {
  return (
    <div
      className={` sm:col-span-4 col-span-2 w-full overflow-x-hidden  h-fit sm:py-4 sm:px-6 hover:bg-gray-100 duration-300  ${
        isShadow && "shadow-sm sm:shadow  rounded-2xl"
      }`}
    >
      <MaterialViewCardDesktop
        material={material}
        addMaterialToCart={addMaterialToCart}
        handleSaveMaterial={handleSaveMaterial}
        handleUnsaveMaterial={handleUnsaveMaterial}
        handleCompare={handleCompare}
        myMaterials={myMaterials}
        autoLike={autoLike}
      />
      <MaterialViewCardMobile
        material={material}
        addMaterialToCart={addMaterialToCart}
        handleSaveMaterial={handleSaveMaterial}
        handleUnsaveMaterial={handleUnsaveMaterial}
        autoLike={autoLike}
      />
    </div>
  );
};

export default MaterialViewCard;
