import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import classes from "./MovieItem.module.css";

const MovieItem = ({ movie, placement }) => {
  const getMovieName = () => {
    let name;

    if (movie.name) {
      name = movie.name;
    } else {
      name = movie.title;
    }

    if (name > 35) {
      name = name.slice(0, 35) + "...";
    }

    return name;
  };

  return (
    <Link to={"movie/" + movie.id} className={`placement-${placement} ${classes.movieCard}`}>
      <div className={classes.image}>
        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="" />
      </div>
      <div className={classes.content}>
        <div className={classes.ratingContainer}>
          <AiFillStar className={classes.icon} />
          <h4 className={classes.ratingText}>{movie.vote_average.toFixed(1)}</h4>
        </div>
        <h3>{getMovieName()}</h3>
      </div>
    </Link>
  );
};

export default MovieItem;
