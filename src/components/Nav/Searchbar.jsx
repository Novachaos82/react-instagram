import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import SearchBarPopUp from "./SearchBarPopUp";

function Searchbar() {
  //  const [searchBarPopupShown, setSearchBarPopupShown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchBarPopupShown, setSearchBarPopupShown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.length >= 1) {
      fetchUsers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    //searchResults.map((res) => {
    //  console.log(res.name);
    //});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const searchBarPopupHandler = () => {
    setSearchBarPopupShown(!searchBarPopupShown);
  };

  const fetchUsers = async () => {
    const userRef = collection(db, "users");

    const q = query(
      userRef,

      where("name", ">=", inputValue.toLowerCase()),
      where("name", "<=", inputValue.toLowerCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    let resultsArr = [];
    querySnapshot.forEach((doc) => {
      //console.log(resultsArr);
      resultsArr.push(doc.data());
    });
    setSearchResults(resultsArr);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="mr-6">
      {" "}
      <input
        ref={inputRef}
        value={inputValue}
        placeholder="search"
        onChange={(e) => handleChange(e)}
        className=" px-2 py-1 rounded-md border-none bg-[#efefef] outline-none color-[#898989] z-10"
        onClick={searchBarPopupHandler}
      ></input>
      {searchBarPopupShown ? (
        <SearchBarPopUp
          inputRef={inputRef}
          inputValue={inputValue}
          handleChange={handleChange}
          searchResults={searchResults}
          searchBarPopupHandler={searchBarPopupHandler}
          searchBarPopupShown={searchBarPopupShown}
          setSearchResults={setSearchResults}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Searchbar;
