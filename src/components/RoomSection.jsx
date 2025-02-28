import { useContext } from "react";
import { RoomContext } from "../content/ContextProvider";
import CalendarHeader from "./CalendarHeader";
import BookingCard from "./BookingCard";

const RoomSection = ({ rooms, dates = [] }) => {
  const formattedDates = dates.map((d) => ({
    fullDate: `2024-${d.month === "May" ? "05" : "06"}-${String(
      d.date
    ).padStart(2, "0")}`,
    ...d,
  }));

  const { cellWidth, daysToShow, getRootState, unlock, delBooking } =
    useContext(RoomContext);

  const daysToShowInt = { web: 14, tablet: 7, mobile: 3 }[daysToShow] || 14;

  return (
    <div className="table w-full">
      <CalendarHeader dates={dates} daysToShow={daysToShowInt} />

      {rooms &&
        rooms.map((room) => {
          return (
            <div key={`${room.id}-room`} className="flex flex-col">
              <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-14 border-b border-gray-300 text-lg tracking-wider text-center bg-zinc-100">
                {room.inventory.slice(0, daysToShowInt).map((count, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 p-2 h-[60px]"
                  >
                    {count}
                  </div>
                ))}
              </div>

              {room.info.map((info, infoIndex) => {
                const bookingsByDate = {};
                info.bookings.forEach((booking) => {
                  if (!bookingsByDate[booking.startDate]) {
                    bookingsByDate[booking.startDate] = [];
                  }
                  bookingsByDate[booking.startDate].push(booking);
                });

                return (
                  <div
                    key={`${room.id}-${infoIndex}`}
                    className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-14 border-gray-300 text-lg tracking-wider text-center bg-white"
                  >
                    {formattedDates
                      .slice(0, daysToShowInt)
                      .map(({ fullDate }) => {
                        const bookings = bookingsByDate[fullDate] || [];

                        return (
                          <div
                            key={fullDate}
                            className="relative border-l border-b border-gray-300 h-20"
                          >
                            {bookings.map((booking, rowIndex) => {
                              const startIndex = formattedDates.findIndex(
                                (d) => d.fullDate === booking.startDate
                              );
                              const endIndex = formattedDates.findIndex(
                                (d) => d.fullDate === booking.endDate
                              );
                              const span = endIndex - startIndex;

                              return (
                                <div
                                  key={`${booking.id}-${rowIndex}`}
                                  className="absolute left-0 w-full opacity-75"
                                  style={{
                                    width: `${span * cellWidth}px`,
                                    top: `${rowIndex * 40}px`,
                                    left: "0",
                                    whiteSpace: "nowrap",
                                    zIndex: 10,
                                  }}
                                >
                                  <BookingCard
                                    roomNumber={info.roomNumber}
                                    {...booking}
                                    onClick={() => {
                                      if (!unlock) {
                                        getRootState(
                                          room.id,
                                          info.id,
                                          booking.id
                                        );
                                        delBooking(
                                          room.id,
                                          info.id,
                                          booking.id
                                        );
                                      }
                                    }}
                                    span={span}
                                    unlock={unlock}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
export default RoomSection;
