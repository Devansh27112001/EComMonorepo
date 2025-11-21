import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="hidden sm:flex gap-2 items-center rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      <SearchIcon className="size-4 text-gray-500" />
      <input
        type="text"
        placeholder="Search.."
        className="flex-1 outline-none text-sm"
        id="search"
      />
    </div>
  );
};

export default Search;
