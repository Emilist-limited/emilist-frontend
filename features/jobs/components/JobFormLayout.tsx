import PageLoader from "@/components/atoms/PageLoader";
import PlannedMaintenanceNextBtn from "./PlannedMaintenanceNextBtn";

const JobFormLayout = ({
  children,
  title,
  loading,
  isLoaded,
  handleSubmit,
  nextPage,
  setNextPage,
}: {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
  isLoaded?: boolean;
  nextPage?: number;
  setNextPage?: (page: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <section className="py-28 pt-14 padding-ctn no-scroll">
      {loading || !isLoaded ? (
        <PageLoader />
      ) : (
        <>
          <h1 className=" text-3xl font-bold max-sm:text-xl pt-6">{title}</h1>
          {nextPage && setNextPage && (
            <PlannedMaintenanceNextBtn
              nextPage={nextPage}
              setNextPage={setNextPage}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 w-full gap-10 mt-4">
              {children}
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default JobFormLayout;
