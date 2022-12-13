import useFetch from "../hooks/useFetch";
import MovieItem from "./MovieItem";
import classes from "./MovieRow.module.css";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const MovieRow = ({ title, url }) => {
  const { data, isPending, error } = useFetch(url);


  return (
    <div>
      <h2>{title}</h2>
      {isPending && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <div className={classes.movieButtonContainer}>
        <button className={`${classes.scroll} ${classes.scrollLeft}`}>
          <BiLeftArrow className={classes.icon} />
        </button>
        <button className={`${classes.scroll} ${classes.scrollRight}`}>
          <BiRightArrow className={classes.icon} />
        </button>
        <div className={classes.movies}>
          {data &&
            data.results.map((movie) => {
              return <MovieItem key={movie.id} movie={movie} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
