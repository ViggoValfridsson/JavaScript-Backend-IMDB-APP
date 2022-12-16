import { Link } from "react-router-dom";
import classes from "./DropDownItem.module.css";

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
      <article>{getMovieName()}</article>
    </Link>
  );
};

export default DropdownItem;
