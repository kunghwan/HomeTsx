import React from "react";

const MyAccount = () => {
  return (
    <>
      <form>
        <div className="flex flex-col mx-auto items-center border w-100 mt-5 p-4 gap-y-2 rounded border-gray-200">
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="">이메일</label>
            <input
              type="text"
              className="bg-gray-100"
              placeholder="email@email.com"
            />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              className="bg-gray-100"
              placeholder="********"
            />
          </div>
          <button className="w-80 rounded-full h-10 items-center text-sm">
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4 relative justify-center">
        <p className="text-center">또는 회원가입</p>
        {/* 왼쪽 선 */}
        <span className="border absolute w-[40%] block h-[1px] top-[10px] left-0 -z-10"></span>
        {/* 오른쪽 선 */}
        <span className="border absolute w-[40%] block h-[1px] top-[10px] right-0 -z-10"></span>
      </div>
    </>
  );
};

export default MyAccount;
