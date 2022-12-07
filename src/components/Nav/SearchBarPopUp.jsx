import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function SearchBarPopUp({
  searchResults,
  searchBarPopupHandler,
  searchBarPopupShown,
  setSearchResults,
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
      {searchBarPopupShown ? (
        <div
          className="fixed top-0 left-0 w-screen h-screen "
          onClick={searchBarPopupHandler}
        >
          <div
            className="fixed w-[230px] h-[120px] left-[calc(100vw_/_2_-_160px)] top-[57px] bg-white "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button onClick={clearAll}>clearAll</button>
            {searchResults.map((result) => {
              return (
                <div key={result.uid} className="">
                  <Link to={"/profile/" + result.uid}>
                    <div>{result.name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchBarPopUp;
