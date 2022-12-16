import { Link } from "react-router-dom";
import classes from "./DropDownItem.module.css";
import image_not_found from "../images/image_not_found.png";

const DropdownItem = ({ movie }) => {
  const getMovieName = () => {
    let name = "";

    if (movie.name) {
      name = movie.name;
    } else {
      name = movie.title;
    }

    if (name.length > 30) {
      name = name.slice(0, 30) + "...";
    }

    return name;
  };

  return (
    <Link to={`/media/movie/${movie.id}`}>
      <article>
        <div className={classes.image}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt={"Poster for " + getMovieName()}
            />
          )}
          {!movie.poster_path && <img src={image_not_found} alt={"Could not find poster for " + getMovieName()} />}
        </div>
        <div className={classes.content}>
          <h3>{getMovieName()}</h3>
          <p className={classes.description}>{movie.overview}</p>
        </div>
      </article>
    </Link>
  );
};

export default DropdownItem;
