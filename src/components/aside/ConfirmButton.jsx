const ConfirmButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2.5 mt-4 text-base tracking-wider leading-none text-white whitespace-nowrap bg-sky-500 rounded min-h-10 max-md:max-w-full hover:bg-sky-600 transition-colors"
    >
      Confirm
    </button>
  );
};

export default ConfirmButton;
