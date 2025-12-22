const UserServices = ({ services }: { services: string[] }) => {
  return (
    <div className="w-full border-b-1 border-[#B8B9B8] sm:px-10 px-4 py-6 ">
      <p className="text-primary-green font-medium max-sm:text-sm py-2 flex-wrap">
        {services?.map((service: string, index: number) => (
          <span key={index} className="pl-1">
            {service}
            {index + 1 !== services?.length && ","}
          </span>
        ))}
      </p>
    </div>
  );
};

export default UserServices;
