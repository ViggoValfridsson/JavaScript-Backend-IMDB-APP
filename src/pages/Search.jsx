import { useParams } from "react-router-dom";
import classes from "./Search.module.css";
import MovieRow from "../components/MovieRow";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  let { query } = useParams();
  query = encodeURIComponent(query);

  const {
    data: movieSearchData,
    isPending: movieSearchPending,
    error: movieSearchError,
  } = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1&include_adult=false`);

  const {
    data: tvSearchData,
    isPending: tvSearchPending,
    error: tvSearchError,
  } = useFetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&page=1&include_adult=false`);

  return (
    <section>
      <div className="container">
        <div className={classes.searchHeader}>
          <h2>{`Search "${decodeURIComponent(query)}"`}</h2>
        </div>
        <div className={classes.result}>
          <MovieRow
            title={"Movie results:"}
            data={movieSearchData}
            isPending={movieSearchPending}
            error={movieSearchError}
            typeOfMedia={"movie"}
          />
        </div>
        <div className={classes.result}>
          <MovieRow
            title={"TV show results:"}
            data={tvSearchData}
            isPending={tvSearchPending}
            error={tvSearchError}
            typeOfMedia={"tv"}
          />
        </div>
      </div>
    </section>
  );
};

export default Search;
