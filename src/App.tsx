import React, { useState, useImperativeHandle, forwardRef } from "react";

// forwardRef로 ref를 전달받을 수 있게 합니다.
const Child = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  // useImperativeHandle을 사용하여 부모 컴포넌트가 호출할 수 있는 메서드를 정의합니다.
  useImperativeHandle(ref, () => ({
    resetCount: () => setCount(0),
    incrementCount: () => setCount((prev) => prev + 1),
  }));

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
});

export default Child;
