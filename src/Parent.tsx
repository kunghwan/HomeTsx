import React, { useRef } from "react";
import Child from "./App";

const Parent = () => {
  const childRef = useRef<any>(null); // child 컴포넌트의 메서드에 접근하기 위한 ref

  const handleReset = () => {
    // 부모에서 자식 컴포넌트의 resetCount 메서드를 호출합니다.
    if (childRef.current) {
      childRef.current.resetCount();
    }
  };

  const handleIncrement = () => {
    // 부모에서 자식 컴포넌트의 incrementCount 메서드를 호출합니다.
    if (childRef.current) {
      childRef.current.incrementCount();
    }
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleReset}>Reset Count</button>
      <button onClick={handleIncrement}>Increment Count</button>
    </div>
  );
};

export default Parent;
