const RoomInfo = ({ roomType, roomNumber, status, tags = [] }) => {
  const getStatusColor = () => {
    switch (status) {
      case "clean":
        return "bg-green-400";
      case "dirty":
        return "bg-red-400";
      case "maintenance":
        return "bg-sky-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <article className="flex gap-4 items-center pt-5 pr-4 pb-2.5 border-r border-b border-solid bg-neutral-50 border-b-[color:var(--Neutral-Gray-25,#E1E1E1)] border-r-[color:var(--Neutral-Gray-25,#E1E1E1)] h-20">
      <div className="flex flex-1 shrink gap-4 items-center self-stretch my-auto w-full basis-0 ">
        <div className="flex w-full justify-end self-stretch my-auto text-right whitespace-nowrap">
          <p className="flex-1 hidden md:block mr-2 shrink self-stretch my-auto text-base tracking-wider leading-5 text-ellipsis text-stone-500 overflow-hidden whitespace-nowrap text-right">
            {roomType}
          </p>
          <p className=" self-stretch my-auto text-lg font-medium tracking-wider leading-none text-ellipsis text-neutral-600 overflow-hidden whitespace-nowrap text-right">
            {roomNumber}
          </p>
        </div>

        <div className="self-stretch my-auto w-4 fill-green-400">
          <div
            className={`flex shrink-0 w-4 h-4 ${getStatusColor()} rounded-sm`}
          />
        </div>
      </div>
      {tags.length > 0 && (
        <div className="flex gap-2 items-center self-start pl-6">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="gap-2 self-stretch px-2 my-auto rounded border border-solid bg-zinc-100 border-[color:var(--Neutral-Gray-25,#E1E1E1)] min-h-5"
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default RoomInfo;
