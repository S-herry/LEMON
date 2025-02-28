const BookingHeader = ({ confNumber, guestName, details }) => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-4 justify-center w-full text-xs leading-none bg-yellow-300 rounded min-h-12 text-stone-500 max-md:max-w-full">
      <div className="flex shrink-0 w-1 h-12 bg-sky-500" />
      <div className="flex flex-col flex-1 shrink justify-center my-auto w-full rounded basis-0 min-w-60 max-md:max-w-full">
        <div className="flex flex-wrap gap-2 items-center w-full max-md:max-w-full">
          <p className="self-stretch my-auto font-semibold">
            Conf.#{confNumber} {guestName}
          </p>
          <p className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
            {details}
          </p>
        </div>
      </div>
    </header>
  );
};

export default BookingHeader;
