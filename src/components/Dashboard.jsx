import React, { useContext } from "react";
import DashboardHeader from "./DashboardHeader";
import ControlPanel from "./ControlPanel";
import RoomSection from "./RoomSection";
import { RoomContext } from "../content/ContextProvider";
import RoomInfo from "./RoomInfo";
const dates = [
  { day: "Sat", date: "18", month: "May", isWeekend: true },
  { day: "Sun", date: "19", month: "May", isWeekend: true },
  { day: "Mon", date: "20", month: "May", isToday: true },
  { day: "Tue", date: "21", month: "May" },
  { day: "Wed", date: "22", month: "May" },
  { day: "Thu", date: "23", month: "May" },
  { day: "Fri", date: "24", month: "May" },
  { day: "Sat", date: "25", month: "May", isWeekend: true },
  { day: "Sun", date: "26", month: "May", isWeekend: true },
  { day: "Mon", date: "27", month: "May" },
  { day: "Tue", date: "28", month: "May" },
  { day: "Wed", date: "29", month: "May" },
  { day: "Thu", date: "30", month: "May" },
  { day: "Fri", date: "31", month: "May" },
];

const DashboardClose = () => {
  const { allRootData, daysToShow } = useContext(RoomContext);
  function bed(bedType) {
    const bedImages = [];
    for (let index = 0; index < bedType; index++) {
      const element = (
        <img
          key={index}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ea2167bf7b33cf59b761370dbc474a40931682e8951e8dd2e738458c0fbce47?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
          className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[0.86] fill-stone-500"
          alt="Bed type"
        />
      );
      bedImages.push(element);
    }
    return bedImages;
  }
  return (
    <main className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <DashboardHeader />

      <div className="relative mt-2 w-full min-h-[873px]">
        <ControlPanel />
        <div className="flex z-0 flex-1 size-full">
          <div className="flex-1 shrink w-full basis-0">
            <div className="flex w-full min-h-[84px]">
              <div className="w-2/6">
                <div className="flex h-[80px] flex-1 gap-2 items-center py-4 pr-4 pl-6 bg-white">
                  {daysToShow != "mobile" ? (
                    <>
                      <div className="flex flex-1 shrink self-stretch  text-sm tracking-wide leading-loose basis-4 min-h-12  rounded-lg  overflow-hidden border border-solid">
                        <button className="flex-1 cursor-pointer gap-1 self-stretch px-4 py-2 h-full text-white basis-0 bg-neutral-500 hover:bg-neutral-600 rounded-none">
                          {daysToShow == "tablet" ? "room" : "By room"}
                        </button>
                        <button className="flex-1 cursor-pointer gap-1 self-stretch px-4 py-2 h-full rounded-none  basis-0 border-[color:var(--Neutral-Gray-60,#787878)] text-neutral-500 hover:bg-neutral-100">
                          {daysToShow == "tablet" ? "floor" : "By floor"}
                        </button>
                      </div>
                      <button className="flex gap-1 cursor-pointer justify-center items-center self-stretch px-2 my-auto w-12 h-12 bg-white rounded min-h-12 hover:bg-neutral-100">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/edb198e0928669c85eb12c923fb9fd82a99a8300f0db00a9992cd00118fc3141?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
                          className="object-contain self-stretch my-auto w-5 aspect-square"
                          alt="Filter"
                        />
                      </button>
                    </>
                  ) : (
                    "Room No."
                  )}
                </div>

                {allRootData &&
                  allRootData.map((room, index) => (
                    <React.Fragment key={`${room.id} ${index}`}>
                      <div className="flex relative  gap-2 items-center py-2 pr-4 pl-6 h-[60px] border-r border-solid bg-zinc-100 border-r-[color:var(--Neutral-Gray-25,#E1E1E1)] ">
                        <div className="flex w-[352px] flex-1 shrink gap-2 items-center self-stretch my-auto  basis-0 min-w-60 cursor-pointer ">
                          <h2 className="self-stretch my-auto text-base font-bold tracking-normal text-ellipsis text-neutral-600">
                            {room.title}
                          </h2>

                          {bed(room.bedType)}
                          <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto basis-0">
                            <img
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/173522eb1d548868146665bf85a0d897a6124a33dfe56fc4851e81128534a1f1?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
                              className="object-contain self-stretch my-auto w-6 aspect-square"
                              alt="Room icon"
                            />
                          </div>
                        </div>
                      </div>
                      {room.info.map((item, index) => (
                        <RoomInfo key={index} {...item} />
                      ))}
                    </React.Fragment>
                  ))}
              </div>

              <RoomSection rooms={allRootData} dates={dates || []} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardClose;
