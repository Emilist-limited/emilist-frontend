import React from "react";

const EmilistBankInfo = () => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="">
        <p>Bank name</p>
        <p className="font-bold">First Bank PLC</p>
      </div>
      <div className="">
        <p>Account number</p>
        <p className="font-bold"> 302384848</p>
      </div>
      <div className="">
        <p>Account name</p>
        <p className="font-bold"> Emilist Enterprise</p>
      </div>
    </div>
  );
};

export default EmilistBankInfo;
