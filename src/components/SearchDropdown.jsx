import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import DropdownItem from "./DropdownItem";
import classes from "./SearchDropdown.module.css";

const SearchDropdown = ({ searchQuery }) => {
  const { data, isPending, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&query=${searchQuery}&page=1&include_adult=false`
  );

  if (!data || !data.results.length > 0) {
    console.log("no data"); // Remove later
    return;
  }

  if (error) {
    console.log("error"); // Remove later
    return;
  }

  let shortenedArray = [];
  for (let i = 0; i < 5; i++) {
    if (data.results[i]) {
      shortenedArray.push(data.results[i]);
    }
  }

  console.log(shortenedArray);

  return (
    <div className={classes.dropdownContainer}>
      {shortenedArray &&
        shortenedArray.map((movie) => {
          return <DropdownItem movie={movie} />;
        })}
    </div>
  );
};

export default SearchDropdown;
