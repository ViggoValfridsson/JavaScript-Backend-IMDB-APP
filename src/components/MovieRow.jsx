import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import MovieItem from "./MovieItem";

const MovieRow = ({ title, url }) => {
  const { data, isPending, error } = useFetch(url);

  return (
    <div>
      <h2>{title}</h2>
      {isPending && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {data &&
        data.results.map((movie) => {
          return <MovieItem key={movie.id} movie={movie} />;
        })}
    </div>
  );
};

export default MovieRow;
