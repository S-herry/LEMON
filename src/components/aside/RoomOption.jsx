const RoomOption = ({ room, isSelected, onSelect }) => {
  return (
    <button
      className={`gap-2 self-stretch my-auto bg-white px-2 py-1 rounded ${
        isSelected ? "bg-sky-100 text-blue-600" : ""
      }`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      {room}
    </button>
  );
};

export default RoomOption;
