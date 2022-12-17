import { useRef } from "react";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
import classes from "./MovieRow.module.css";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RxDividerVertical } from "react-icons/rx";
import ErrorMessage from "./ErrorMessage";

const MovieRow = ({ title, typeOfMedia, data, isPending, error }) => {
  const loadingCardAmount = 8;
  const movieRow = useRef();
  let moviePlacement = 0;

  const getTargetElement = (movies, positionOfTargetElement) => {
    for (const movie of movies) {
      const movieClassName = movie.className.slice(10, 13);
      const moviePosition = Number(movieClassName.replace(/\D/g, ""));

      if (moviePosition === positionOfTargetElement) {
        return movie;
      }
    }
  };

  const handleClick = (direction) => {
    if (!data) {
      return;
    }
    const columnWidth = movieRow.current.scrollWidth / data.results.length;
    const currentColumn = Math.round(movieRow.current.scrollLeft / columnWidth);
    const amountOfVisibleMovies = Math.round(movieRow.current.getBoundingClientRect().width / columnWidth);
    const movies = movieRow.current.children;

    if (direction === "right") {
      const positionOfTargetElement = currentColumn + amountOfVisibleMovies + (amountOfVisibleMovies - 1);
      let targetMovie = getTargetElement(movies, positionOfTargetElement);

      if (!targetMovie) {
        targetMovie = movieRow.current.lastChild;
      }
      targetMovie.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }

    if (direction === "left") {
      const positionOfTargetElement = currentColumn - amountOfVisibleMovies;
      let targetMovie = getTargetElement(movies, positionOfTargetElement);

      if (!targetMovie) {
        targetMovie = movieRow.current.firstChild;
      }

      targetMovie.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  };

  const noMoviesFound = () => {
    if (!data) {
      return false;
    }

    if (data.results.length === 0) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <Link to={`/${title.replace(/\s/g, "_").toLowerCase()}`} className={classes.headingContainer}>
        <RxDividerVertical className={classes.headingIcon} />
        <h2>{title}</h2>
      </Link>
      {noMoviesFound() && (
        <div className={classes.errorContainer}>
          <h3>Your search gave no results</h3>
          <h4>Possible solutions:</h4>
          <ul>
            <li>Check if your spelling is correct</li>
            <li>Try other search words</li>
            <li>Maybe there is an alternative title to the movie/show</li>
          </ul>
        </div>
      )}
      {error && <ErrorMessage />}
      {!error && !noMoviesFound() && (
        <div className={classes.movieButtonContainer}>
          <button onClick={() => handleClick("left")} className={`${classes.scroll} ${classes.scrollLeft}`}>
            <BiLeftArrow className={classes.icon} />
          </button>
          <button onClick={() => handleClick("right")} className={`${classes.scroll} ${classes.scrollRight}`}>
            <BiRightArrow className={classes.icon} />
          </button>
          <div className={classes.movies} ref={movieRow}>
            {isPending && [...Array(loadingCardAmount)].map((e, i) => <MovieItem typeOfMedia={"loading"} key={i} />)}
            {data &&
              data.results.map((movie) => {
                return (
                  <MovieItem placement={moviePlacement++} key={movie.id} movie={movie} typeOfMedia={typeOfMedia} />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRow;
