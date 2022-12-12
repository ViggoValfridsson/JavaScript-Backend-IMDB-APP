import React from "react";
import { AiOutlineStar } from "react-icons/ai";

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
    <div>
      <div className="image">
        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="" />
      </div>
      <div className="content">
        <h3>{movieName}</h3>
        <h4>
          <AiOutlineStar />
          {movie.vote_average}
        </h4>
      </div>
    </div>
  );
};

export default MovieItem;
