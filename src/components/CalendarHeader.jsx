import { useRef, useContext, useEffect } from "react";
import { RoomContext } from "../content/ContextProvider";
const CalendarDate = ({ day, date, month, isToday, isWeekend }) => {
  const dayColor = isWeekend ? "text-red-400" : "text-neutral-600";
  const dateColor = isToday ? "text-sky-500" : "text-stone-900";
  const bgColor = isToday
    ? "bg-blue-50"
    : isWeekend
    ? "bg-amber-50"
    : "bg-white";

  const cellRef = useRef();
  const { settingCellWidth } = useContext(RoomContext);
  useEffect(() => {
    if (cellRef.current) {
      settingCellWidth(cellRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      ref={cellRef}
      className={`flex flex-col  flex-1 shrink justify-center items-center px-2 pt-1 ${bgColor} border-r border-l border-solid basis-0 border-l-[color:var(--Neutral-Gray-25,#E1E1E1)] border-r-[color:var(--Neutral-Gray-25,#E1E1E1)] text-center`}
    >
      {isToday && <div className="flex w-full bg-blue-500 min-h-1" />}
      <div className="flex flex-col items-center justify-center h-full">
        <p className={`text-xs font-semibold leading-none ${dayColor}`}>
          {day}
        </p>
        <p className={`text-base font-bold tracking-normal ${dateColor}`}>
          {date}
        </p>
        <p className="text-xs leading-none text-neutral-500">{month}</p>
      </div>
    </div>
  );
};

const CalendarHeader = ({ dates, daysToShow }) => {
  return (
    <section className="overflow-hidden flex-1 shrink text-center border-t border-b border-[color:var(--Neutral-Gray-25,#E1E1E1)] whitespace-nowrap basis-0 min-w-60 h-[80px]">
      <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-14 h-full ">
        {dates &&
          dates.slice(0, daysToShow).map((date, index) => {
            return <CalendarDate key={index} {...date} />;
          })}
      </div>
    </section>
  );
};

export default CalendarHeader;
