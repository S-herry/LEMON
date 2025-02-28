import { useEffect, useState, useContext } from "react";
import BookingHeader from "./BookingHeader";
import RoomSection from "./RoomSection";
import ConfirmButton from "./ConfirmButton";
import { RoomContext } from "../../content/ContextProvider";

const RoomMove = () => {
  const {
    currentRoomState,
    currentRoomInfo,
    currentBooking,
    updateBooking,
    allRootData,
    getRootState,
  } = useContext(RoomContext);

  const [selectedRooms, setSelectedRooms] = useState();
  useEffect(() => {
    const title = currentRoomState.title;
    const room = currentRoomInfo.roomNumber;
    const infoId = currentRoomInfo.id;

    setSelectedRooms({
      [title]: { room, infoId },
    });
  }, [currentRoomState, currentRoomInfo]);

  const handleRoomSelection = (type, room, infoId) => {
    setSelectedRooms({
      [type]: { room, infoId },
    });
  };

  return (
    <main className="max-w-[592px]">
      <BookingHeader
        confNumber={currentBooking.roomNumber}
        guestName={currentBooking.name}
        details={`${currentBooking.startDate} ~ ${currentBooking.endDate}  `}
      />

      <section className="mt-2 w-full rounded max-md:max-w-full">
        <div className="flex flex-col justify-center px-6 py-4 w-full bg-white rounded border border-solid border-[color:var(--Neutral-Gray-20,#E9E9E9)] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center w-full text-sm max-md:max-w-full">
            <h1 className="text-base font-bold tracking-normal text-neutral-500">
              Room Move to
            </h1>
            {allRootData &&
              allRootData
                .filter(
                  (root, index, self) =>
                    self.findIndex((r) => r.id === root.id) === index
                )
                .map((root, rootIndex) => {
                  const allRoomNumbers = root.info.flatMap(
                    (info) => info.roomNumber
                  );

                  return (
                    <RoomSection
                      key={root.id}
                      number={rootIndex + 1}
                      type={root.id}
                      rooms={allRoomNumbers}
                      infoList={root.info} // ✅ 传递完整 info 数据
                      selectedRoom={selectedRooms?.[root.id]} // ✅ 现在是 { room, infoId }
                      onSelect={(room, infoId) =>
                        handleRoomSelection(root.id, room, infoId)
                      }
                      priceType="original"
                    />
                  );
                })}

            <button className="flex flex-col justify-center items-end mt-2 w-full font-medium tracking-wide leading-loose text-stone-500 max-md:max-w-full">
              <div className="flex gap-1 items-center py-2 rounded">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0904150ca45ae0ee4740cf452387823f0c9833ec7755bc559fcbb1cafe582b88?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  alt="More options"
                />
                <span>More</span>
              </div>
            </button>
          </div>

          <ConfirmButton
            onClick={() => {
              const [toRoomType, { room: toRoomId, infoId: toInfoId } = {}] =
                Object.entries(selectedRooms)[0] || [];

              if (!toRoomType || !toRoomId || !toInfoId) {
                console.warn("未選擇房間");
                return;
              }

              updateBooking(
                toRoomType,
                toInfoId // 傳遞 infoId
              );
              getRootState(null);
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default RoomMove;
