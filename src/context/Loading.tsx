import { CgSpinner } from "react-icons/cg";
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto  h-screen gap-y-2.5">
      <CgSpinner className="text-4xl animate-spin" />
      <h1>App is Loading</h1>
    </div>
  );
};

export default Loading;
