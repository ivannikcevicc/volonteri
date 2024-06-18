
import { Search } from "./navbar/search";

const SearchHome = () => {
  return (
    <div className="px-2 min-h-[30vh] bg-gradient-to-b from-white to-green-100 flex flex-col items-center justify-around">
      <div className="cat:text-[3rem] sm:text-[2.5rem] text-[2rem] text-center">
        Pretraži poslove
      </div>
      <Search />
    </div>
  );
};

export default SearchHome;
