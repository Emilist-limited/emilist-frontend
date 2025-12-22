import { useBlacklistBusiness } from "@/features/services/hooks/useBlacklistBusiness";

import UserPublicProfile from "./UserPublicProfile";
import FavoriteButton from "../atoms/FavouriteButton";
import CompareButton from "../atoms/CompareButton";
import BlackListButton from "../atoms/BlackListButton";
import ShareButton from "../atoms/ShareButton";
import WhiteBgLoader from "../atoms/WhiteBgLoader";

interface PublicExpertInfoProfileProps {
  serviceInfo: any;
  handleOpen: () => void;
  handleCompare: (businessId: string) => void;
  handleLike: (businessId: string) => void;
  handleUnlike: (businessId: string) => void;
  isBusinessOwnerCurrentUser?: boolean;
}

const PublicExpertInfoProfile = ({
  serviceInfo,
  handleOpen,
  handleCompare,
  handleLike,
  handleUnlike,
  isBusinessOwnerCurrentUser = false,
}: PublicExpertInfoProfileProps) => {
  const { load, handleBlacklistBuisness } = useBlacklistBusiness();

  return (
    <section className="w-full flex items-end justify-between sm:gap-8 gap-4 flex-wrap ">
      {load && <WhiteBgLoader />}
      <UserPublicProfile
        profileImage={serviceInfo?.business?.profileImage}
        firstName={serviceInfo?.business?.firstName}
        lastName={serviceInfo?.business?.lastName}
        level={serviceInfo?.business?.userId.level}
        rating={serviceInfo?.business?.averageRating || 0}
        totalReviews={serviceInfo?.business?.totalReviews || 0}
        responsiveClasses="w-[72px] h-[72px] max-sm:w-[42px] max-sm:h-[42px]"
        size={30}
      />
      <div className="flex gap-8 max-sm:gap-4">
        <FavoriteButton
          liked={serviceInfo?.liked}
          onSave={() => handleLike(serviceInfo?.business?._id)}
          onUnsave={() => handleUnlike(serviceInfo?.business?._id)}
          show={false}
        />
        <CompareButton
          compare={() => handleCompare(serviceInfo?.business?._id)}
          isCompare={serviceInfo?.isCompared}
          show={false}
        />
        {!isBusinessOwnerCurrentUser && (
          <BlackListButton
            type="business"
            show={false}
            handleBlacklist={() =>
              handleBlacklistBuisness(serviceInfo?.business?._id)
            }
          />
        )}

        <ShareButton handleOpen={handleOpen} type="business" show={false} />
      </div>
    </section>
  );
};

export default PublicExpertInfoProfile;
