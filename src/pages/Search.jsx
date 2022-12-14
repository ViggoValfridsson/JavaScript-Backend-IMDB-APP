import { useParams } from "react-router-dom";
import classes from "./Search.module.css";
import MovieRow from "../components/MovieRow";

const Search = () => {
  let { query } = useParams();
  query = query.replace(/_/g, " ");
  const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&query=${query}&page=1&include_adult=false`;
  const tvSearchUrl = `https://api.themoviedb.org/3/search/tv?api_key=f7f5e53209dd58bafcd025bff2a1e966&query=${query}&page=1&include_adult=false`;

  return (
    <section>
      <div className="container">
        <div className={classes.searchHeader}>
          <h2>{`Search "${query}"`}</h2>
        </div>
        <div className={classes.result}>
          <MovieRow title={"Movie results: "} url={movieSearchUrl} typeOfMedia={"movie"} />
        </div>
        <div className={classes.result}>
          <MovieRow title={"TV show results:"} url={tvSearchUrl} typeOfMedia={"tv"} />
        </div>
      </div>
    </section>
  );
};

export default Search;
