import useFetch from "../hooks/useFetch";
import { useRef, useEffect } from "react";
import DropdownItem from "./DropdownItem";
import classes from "./SearchDropdown.module.css";

const SearchDropdown = ({ searchQuery, closeDropdown }) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const { data, isPending, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=1&include_adult=false`
  );
  const dropdown = useRef();
  let placement = 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, closeDropdown]);

  if (!data || !data.results.length > 0 || error || isPending) {
    return;
  }

  let shortenedArray = [];
  for (let i = 0; i < 5; i++) {
    if (data.results[i]) {
      shortenedArray.push(data.results[i]);
    }
  }

  return (
    <div className={classes.dropdownContainer} aria-label="Autocomplete results" ref={dropdown}>
      {shortenedArray &&
        shortenedArray.map((movie) => {
          return <DropdownItem movie={movie} key={movie.id} placement={placement++}/>;
        })}
    </div>
  );
};

export default SearchDropdown;
