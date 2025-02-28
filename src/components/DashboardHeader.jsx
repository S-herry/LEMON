const DashboardHeader = () => {
  const navList = ["TAIPEI STATION", "TPEB1"];
  return (
    <header className="flex overflow-hidden flex-wrap gap-4 w-full bg-white min-h-16">
      <h1 className="flex-1 text-2xl text-left my-auto ms-8 text-neutral-600">
        Dashboard
      </h1>
      <nav className="flex gap-4 my-auto text-xs min-w-60 text-neutral-500">
        {navList.map((nav, index) => (
          <button
            key={index}
            className="flex gap-2 my-auto  cursor-pointer hover:text-neutral-600"
          >
            <p className="self-stretch my-auto">{nav}</p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae7749e8218b5a8bcf32e030a81ad8e76a076f3561ee2fa4708192741ed26ff0?placeholderIfAbsent=true&apiKey=e4e9d8e6247f43ae9f065cb0082b8a07"
              className="my-auto w-4 "
              alt="Location icon"
            />
          </button>
        ))}
      </nav>
    </header>
  );
};

export default DashboardHeader;
