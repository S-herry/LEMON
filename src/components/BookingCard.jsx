import { useRef } from "react";

const BookingCard = ({
  bookingMode,
  bookingStatus,
  roomNumber,
  name,
  phone,
  onClick,
  unlock,
  color,
}) => {
  const cardRef = useRef(null);
  const mode = bookingMode == "Individual" || bookingMode == "Group";

  const getBackgroundColor = () => {
    switch (bookingStatus) {
      case "Check in":
        return "bg-emerald-200 ";
      case "Check out":
        return "bg-rose-300 ";
      case "future":
      default:
        return "bg-blue-200";
    }
  };

  const getBarColor = () => {
    switch (bookingMode) {
      case "Group":
        return "bg-purple-500 ";
      case "Day use":
        return "bg-orange-500";
      case "Individual":
      default:
        return "bg-blue-500 ";
    }
  };
  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`flex h-full  w-full   ${
        !unlock ? "cursor-pointer" : ""
      } z-0 items-center self-start rounded-xl overflow-hidden relative  py-1  `}
      style={{
        marginLeft: "25px",
        marginRight: "-25px",
        borderRadius: "10px 0 0 10px",
        display: "grid",
        backgroundColor: color || "transparent",
      }}
    >
      <div
        className={`flex shrink-0 w-1  h-full absolute  ${getBarColor()} `}
      ></div>

      <div className={`${getBackgroundColor()} nin-h-full text-left ps-3  `}>
        <div className="flex flex-col flex-1 shrink justify-center items-start py-2 pl-1.5 my-auto  basis-0 max-h-16">
          <div className="max-w-full w-[108px]">
            <p
              className={`text-xs font-semibold leading-none text-ellipsis text-neutral-600 ${
                mode ? "" : "invisible"
              }`}
            >
              {roomNumber || "占位符"}
            </p>

            <p className="tracking-normal text-ellipsis ">{name}</p>
            <p
              className={`text-xs font-semibold leading-none text-ellipsis text-neutral-600 ${
                mode ? "" : "invisible"
              }`}
            >
              {phone || "09"}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default BookingCard;
