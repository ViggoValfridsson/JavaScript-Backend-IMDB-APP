import useFetch from "../hooks/useFetch";
import DropdownItem from "./DropdownItem";
import classes from "./SearchDropdown.module.css";

const SearchDropdown = ({ searchQuery }) => {
  const { data, isPending, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&query=${searchQuery}&page=1&include_adult=false`
  );

  if (!data || !data.results.length > 0 || error) {
    return;
  }

  let shortenedArray = [];
  for (let i = 0; i < 5; i++) {
    if (data.results[i]) {
      shortenedArray.push(data.results[i]);
    }
  }

  return (
    <div className={classes.dropdownContainer} aria-label="Autocomplete results">
      {shortenedArray &&
        shortenedArray.map((movie) => {
          return <DropdownItem movie={movie} />;
        })}
    </div>
  );
};

export default SearchDropdown;
