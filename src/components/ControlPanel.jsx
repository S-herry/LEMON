import { useEffect, useState, useContext } from "react";
import PoolBox from "./PoolBox";
import { RoomContext } from "../content/ContextProvider";

const ControlPanel = () => {
  const [time, setTime] = useState(600);
  const { unlock, settingUnlock, currentRoomState, getRootState, saveData } =
    useContext(RoomContext);

  const handleOpenUnlock = () => {
    if (unlock) {
      setTime(600);
    }
    settingUnlock();
    getRootState(null);
  };

  useEffect(() => {
    if (!unlock) {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            settingUnlock();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // 组件卸载或 unlock 变动时清除定时器
    }
  }, [unlock]);

  return (
    <section className="flex z-0 flex-col justify-center pr-8 pl-6 w-full bg-zinc-100 min-h-20">
      <div className="flex gap-2 flex-wrap items-center w-full">
        <div className="flex gap-1 items-center my-auto min-h-12 min-w-60">
          <button className="gap-2  my-auto text-base tracking-wider leading-none bg-white rounded border border-solid border-[color:var(--Neutral-Gray-20,#E9E9E9)] min-h-12 text-neutral-600 w-[156px]">
            2025 Apr
          </button>
          <button className=" flex gap-1 justify-center items-center cursor-pointer px-2 my-auto w-12 h-12 bg-white rounded border border-solid border-[color:var(--Neutral-Gray-20,#E9E9E9)] min-h-12 hover:bg-neutral-100">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0468e2fbbad05a250493675a3cc0a371694f6db2ab9b1d1761e44b8e860e807f?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
              className="object-contain my-auto w-5 aspect-square"
              alt="Previous"
            />
          </button>
          <button className=" cursor-pointer px-2 py-4 my-auto text-sm tracking-wide leading-none whitespace-nowrap bg-white rounded border border-solid border-[color:var(--Neutral-Gray-25,#E1E1E1)] min-h-12 text-neutral-600 w-[90px] hover:bg-neutral-100">
            Today
          </button>
          <button className="flex gap-1 justify-center items-center cursor-pointer px-2 my-auto w-12 h-12 bg-white rounded border border-solid border-[color:var(--Neutral-Gray-20,#E9E9E9)] min-h-12 hover:bg-neutral-100">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fb83180b2ee23959e2dc1c3bf20ea893681711f0d0c1efa15e4dfd04bcb21c2?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
              className="object-contain my-auto w-5 aspect-square"
              alt="Next"
            />
          </button>
        </div>
        <div className="hidden md:flex gap-2.5 my-auto basis-0 ms-auto">
          <p className="my-auto text-sm  leading-loose text-neutral-600">
            unlock
          </p>
          <button
            className={`flex overflow-hidden flex-col justify-center items-start p-0.5 my-auto rounded-3xl  w-[52px] cursor-pointer ${
              unlock ? " bg-zinc-400" : " bg-blue-500"
            }`}
            onClick={handleOpenUnlock}
          >
            <div
              className={`flex shrink-0 w-7 h-7 bg-white rounded-3xl ${
                unlock ? "" : "ms-auto"
              }`}
            />
          </button>
        </div>
        {!unlock && (
          <>
            <button className="w-20  cursor-pointer bg-red-400 hidden md:flex text-white rounded-sm">
              重置
            </button>
            <button
              onClick={saveData}
              className="w-20  cursor-pointer bg-blue-400 hidden md:flex  text-white rounded-sm"
            >
              保存
            </button>
          </>
        )}
      </div>
      {!unlock && <PoolBox time={time} roomState={currentRoomState} />}
    </section>
  );
};

export default ControlPanel;
