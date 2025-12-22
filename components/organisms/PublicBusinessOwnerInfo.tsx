interface PublicBusinessOwnerInfoProps {
  handleOpenModal: () => void;
  serviceInfo: any;
}

const PublicBusinessOwnerInfo = ({
  handleOpenModal,
  serviceInfo,
}: PublicBusinessOwnerInfoProps) => {
  return (
    <section className="pt-10 sm:pb-10 pb-6">
      <h5 className="sm:text-xl font-semibold">About The Seller</h5>
    </section>
  );
};

export default PublicBusinessOwnerInfo;
