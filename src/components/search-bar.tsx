import DropdownMenuDemo from "./dropDownMenu";

const SearchBar = () => {
  return (
    <form className="mx-auto max-w-xl">
      <div className="flex">
        <DropdownMenuDemo />

        <div className="relative w-96 text-sm shadow-[0_2px_10px] shadow-black/10 ">
          <input
            type="search"
            id="search-dropdown"
            className="hover:bg-mauve3 data-[placeholder]:text-violet9 z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 outline-none "
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button
            type="submit"
            className="hover:bg-mauve3 text-gray absolute end-0 top-0 z-20 block h-full rounded-r-lg rounded-r-lg border  border-gray-300 border-l-gray-50 bg-gray-50 p-2.5 p-2.5 text-sm font-medium outline-none"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
