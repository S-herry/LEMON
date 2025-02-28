import RoomOption from "./RoomOption";
import PriceTag from "./PriceTag";
const RoomSection = ({
  number,
  type,
  rooms,
  selectedRoom,
  onSelect,
  priceType,
  infoList,
}) => {
  return (
    <div className="flex flex-col justify-center w-full leading-none max-md:max-w-full">
      <div className="flex flex-wrap gap-4 items-center mt-2 w-full min-h-8 max-md:max-w-full">
        <div className="self-stretch my-auto w-7 h-7 tracking-wide text-center whitespace-nowrap rounded-3xl bg-zinc-100 min-h-7 text-neutral-600">
          {number}
        </div>
        <div className="self-stretch my-auto font-semibold tracking-normal leading-loose text-neutral-500 w-[30px]">
          {type}
        </div>
        <div className="flex gap-2 items-center self-stretch my-auto tracking-wide whitespace-nowrap text-stone-500">
          {rooms &&
            rooms.map((room) => {
              const matchedInfo = infoList.find(
                (info) => info.roomNumber === room
              );

              return (
                <RoomOption
                  key={room}
                  room={room}
                  isSelected={selectedRoom?.room === room}
                  onSelect={() => onSelect(room, matchedInfo?.id)}
                />
              );
            })}
        </div>
        <div className="flex flex-1 shrink gap-2.5 items-end self-stretch my-auto text-xs leading-none basis-0 min-w-60">
          <PriceTag type={priceType} />
        </div>
      </div>
    </div>
  );
};

export default RoomSection;
