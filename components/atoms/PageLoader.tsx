const PageLoader = ({ height = "h-[50vh]" }: { height?: string }) => {
  return (
    <div
      className={`flex item-center justify-center text-green-500 mt-6 ${height}`}
    >
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default PageLoader;
