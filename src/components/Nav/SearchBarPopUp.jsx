import React from "react";

import { Link } from "react-router-dom";

function SearchBarPopUp({
  searchResults,
  searchBarPopupHandler,
  searchBarPopupShown,
  setSearchResults,
  inputRef,
  inputValue,
  handleChange,
}) {
  //  useEffect(() => {
  //    searchResults.map((res) => {
  //      console.log(res.name);
  //    });
  //  }, [searchResults]);

  const clearAll = () => {
    setSearchResults([]);
    console.log(searchResults);
  };
  return (
    <div>
      <div
        className="fixed top-0 left-0 w-screen h-screen z-10"
        onClick={searchBarPopupHandler}
      >
        <div
          className="fixed w-[500px] h-[450px]  left-[calc(100vw_/_2_-_300px)] top-[57px] bg-white drop-shadow-md rounded-md flex  flex-col items-start "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-end flex-col px-4 border-b py-2 w-full">
            <button className="text-blue-500 font-semibold" onClick={clearAll}>
              Clear All
            </button>
          </div>
          {searchResults.map((result) => {
            return (
              <div
                key={result.uid}
                className="w-full"
                onClick={searchBarPopupHandler}
              >
                <Link
                  to={"/profile/" + result.uid}
                  className="flex flex-row items-center px-5 py-2 w-full gap-4 hover:bg-[#ebe2e2]"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={result.pic}
                    alt=""
                  />
                  <div>{result.name}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchBarPopUp;
