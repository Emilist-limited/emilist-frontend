"use client";

import React, { useCallback, useState } from "react";

// A child component that only re-renders if props change
const DisplayMessage = React.memo(({ showMessage }: any) => {
  console.log("DisplayMessage rendered");
  return <p>{showMessage()}</p>;
});

function Counter() {
  const [count, setCount] = useState(0);

  // Without useCallback
  //   const showMessage = () => {
  //     return `Count is ${count}`;
  //   };

  //   With useCallback
  const showMessage = useCallback(() => {
    return `Count is ${count}`;
  }, [count]);

  return (
    <div className="flex flex-col space-y-2">
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <DisplayMessage showMessage={showMessage} />
    </div>
  );
}

export default Counter;
