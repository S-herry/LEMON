import RoomMove from "./aside/RoomMove";
const PoolBox = ({ time, roomState }) => {
  return (
    <aside className="flex overflow-hidden absolute bottom-0 z-20 gap-2.5 items-start px-8 pt-4 pb-8 max-w-full bg-white shadow-sm h-[800px] min-h-[793px] right-[0] w-[600px]">
      <div className="flex-1 shrink w-full bg-white basis-0 min-w-60">
        <div className="flex flex-wrap gap-2 items-center w-full text-base text-neutral-600">
          <div className="flex flex-1 shrink items-center self-stretch my-auto basis-0 min-w-60">
            <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-60">
              <h2 className="self-stretch my-auto font-bold tracking-normal text-ellipsis">
                Pool Box
              </h2>
              <p className="my-auto tracking-tight leading-6 whitespace-nowrap text-ellipsis w-[215px]">
                drag reservation here
              </p>
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden flex-col flex-1  px-8 py-4 mt-4 w-full rounded-lg border border-solid bg-neutral-50 border-[color:var(--Neutral-Gray-25,#E1E1E1)]">
          <div className="text-left flex justify-between">
            <h3 className="text-red-600">
              {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
            </h3>
            <div>icon</div>
          </div>
          {roomState && <RoomMove />}

          <div className="flex w-full min-h-[337px]" />
        </div>
      </div>
    </aside>
  );
};

export default PoolBox;
