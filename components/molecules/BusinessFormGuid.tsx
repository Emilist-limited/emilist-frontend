import React from "react";

const BusinessFormGuid = () => {
  return (
    <div className="flex flex-col gap-6 max-lg:hidden  max-md:flex max-sm:hidden col-span-2  max-md:col-span-2 max-sm:col-span-5">
      <div className="w-full shadow-lg flex flex-col justify-center py-5 rounded-lg border-l-8 border-primary-green px-4">
        <h3 className="sm:text-lg font-medium">Don't have a business name?</h3>

        <p className="py-3 max-sm:text-sm">
          No worries - just use your own name
        </p>
      </div>
    </div>
  );
};

export default BusinessFormGuid;
