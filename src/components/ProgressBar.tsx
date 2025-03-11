const ProgressBar = ({ showModal }: { showModal: number }) => {
  // --------------------------------------------VARIABLES

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className="mb-8 flex gap-1">
      <div
        className={`h-[8px] w-1/4  ${showModal >= 1 ? "bg-prim2" : "bg-gray-200"}`}
      ></div>
      <div
        className={`h-[8px] w-1/4 ${showModal >= 2 ? "bg-prim2" : "bg-gray-200"}`}
      ></div>
      <div
        className={`h-[8px] w-1/4 ${showModal >= 3 ? "bg-prim2" : "bg-gray-200"}`}
      ></div>
      <div
        className={`h-[8px] w-1/4  ${showModal >= 4 ? "bg-prim2" : "bg-gray-200"}`}
      ></div>
    </div>
  );
};
export default ProgressBar;
