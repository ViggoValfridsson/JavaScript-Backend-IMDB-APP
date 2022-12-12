import useFetch from "../hooks/useFetch";
import MovieItem from "./MovieItem";
import classes from "./MovieRow.module.css";

const MovieRow = ({ title, url }) => {
  const { data, isPending, error } = useFetch(url);

  //Fixa scroll button

  return (
    <div>
      <h2>{title}</h2>
      {isPending && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <div className={classes.movies}>
        {data &&
          data.results.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
};

export default MovieRow;
