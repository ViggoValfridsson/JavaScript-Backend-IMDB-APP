import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import classes from "./MovieItem.module.css";

const MovieItem = ({ movie }) => {
  let movieName = "";

  if (movie.name) {
    movieName = movie.name;
  }
  if (movie.title) {
    movieName = movie.title;
  }

  console.log(movie);
  return (
    <Link to={"movie/" + movie.id} className={classes.movieCard}>
      <div className={classes.image}>
        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="" />
      </div>
      <div className={classes.content}>
        <h3>{movieName}</h3>
        <div className={classes.ratingContainer}>
          <AiFillStar className={classes.icon} />
          <h4 className={classes.ratingText}>{movie.vote_average.toFixed(1)}</h4>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
