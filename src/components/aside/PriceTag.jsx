const PriceTag = ({ type }) => {
  const isUpdate = type === "update";

  return (
    <div className="flex gap-2.5 items-center w-[94px]">
      <div
        className={`gap-2.5 self-stretch px-2 py-1.5 my-auto rounded-sm min-h-[26px] w-[94px] ${
          isUpdate ? "bg-sky-100 text-blue-600" : "bg-zinc-100 text-neutral-400"
        }`}
      >
        {isUpdate ? "Update Price" : "Original Price"}
      </div>
    </div>
  );
};

export default PriceTag;
