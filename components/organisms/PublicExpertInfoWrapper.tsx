"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { CompareContext } from "@/lib/context/CompareState";
import { ROUTES } from "@/lib/constants/routes";
import { useGetServiceInfo } from "@/features/services/hooks/useGetServiceInfo";
import { useCompare } from "@/features/services/hooks/useCompare";
import { useLikeBusiness } from "@/features/services/hooks/useLikeBusiness";
import { useUnlikeBusiness } from "@/features/services/hooks/useUnLikeBusiness";
import { useGetBusinessReviews } from "@/features/services/hooks/useGetBusinessReviews";

import PageLoader from "../atoms/PageLoader";
import CompareSearch from "../molecules/CompareSearch";
import PublicExpertInfoProfile from "./PublicExpertInfoProfile";
import WhiteBgLoader from "../atoms/WhiteBgLoader";
import ShareLink from "../molecules/ShareLink";
import PublicExpertMainContent from "./PublicExpertMainContent";
import ContactExpertModal from "./modal/ContactExpertModal";
import PublicExpertReviewsHeader from "./PublicExpertReviewsHeader";
import PublicExpertReviewSlider from "./PublicExpertReviewSlider";
import PublicBusinessOwnerInfo from "./PublicBusinessOwnerInfo";
import ReviewSliderLoader from "../molecules/skeletonLoaders/ReviewSliderLoader";
import BusinessProfile from "./BusinessProfile";

const PublicExpertInfoWrapper = ({ businessId }: { businessId: string }) => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { compareServices } = useContext(CompareContext);

  const { compare, isComparing } = useCompare();
  const { handleLikeBusiness, isLoading } = useLikeBusiness();
  const { handleUnlikeBusiness, isLoad } = useUnlikeBusiness();
  const { loading, refetchServiceInfo, serviceInfo } =
    useGetServiceInfo(businessId);
  const { data, isLoading: isFetching } = useGetBusinessReviews(
    businessId,
    "mostRecent"
  );

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  const handleLike = (id: string) => {
    handleLikeBusiness(id, () => {
      refetchServiceInfo();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnlikeBusiness(id, () => {
      refetchServiceInfo();
    });
  };

  const handleCompare = (id: string) => {
    compare(id, () => {
      refetchServiceInfo();
    });
  };

  const handleOpen = () => {
    setOpenShareModal(true);
  };

  const handleOpenModal = () => {
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
      return;
    }
    setOpenModal(true);
  };

  const loader = isLoad || isLoading || isComparing;

  const isBusinessOwnerCurrentUser =
    currentUser?._id === serviceInfo?.business?.userId?._id;

  return (
    <div className="sm:pt-10 padding-ctn overflow-x-hidden">
      {loader && <WhiteBgLoader />}
      {loading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <>
          {compareServices?.length > 0 && (
            <CompareSearch
              title="businesses"
              link={ROUTES?.COMPARE_BUSINESSES}
            />
          )}
          <PublicExpertInfoProfile
            serviceInfo={serviceInfo}
            handleOpen={handleOpen}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleCompare={handleCompare}
            isBusinessOwnerCurrentUser={isBusinessOwnerCurrentUser}
          />
          <PublicExpertMainContent
            handleOpenModal={handleOpenModal}
            serviceInfo={serviceInfo?.business}
            isBusinessOwnerCurrentUser={isBusinessOwnerCurrentUser}
          />
          <PublicExpertReviewsHeader data={data} businessId={businessId} />
          {isFetching ? (
            <ReviewSliderLoader />
          ) : (
            <PublicExpertReviewSlider
              reviews={data}
              noReviewMsg="No review for this business"
            />
          )}
          <PublicBusinessOwnerInfo
            serviceInfo={serviceInfo?.business}
            handleOpenModal={handleOpenModal}
          />
          <BusinessProfile
            handleOpenModal={handleOpenModal}
            serviceInfo={serviceInfo?.business}
            isBusinessOwnerCurrentUser={isBusinessOwnerCurrentUser}
          />
          <ShareLink
            handleCancel={() => setOpenShareModal(false)}
            isModalOpen={openShareModal}
            link={`https://emilist.com/expert/info/${businessId}`}
            title="Share business"
            textToCopy="Check out this business on Emilist"
            id={businessId}
          />
          <ContactExpertModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            user={serviceInfo?.business?.userId}
          />
        </>
      )}
    </div>
  );
};

export default PublicExpertInfoWrapper;
