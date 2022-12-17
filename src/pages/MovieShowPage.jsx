import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import classes from "./MovieShowPage.module.css";
import { AiFillStar } from "react-icons/ai";
import { CircularProgress } from "@mui/material";
import image_not_found from "../images/image_not_found.png";
import ErrorMessage from "../components/ErrorMessage";

const MovieShowPage = () => {
  const { media, id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=f7f5e53209dd58bafcd025bff2a1e966`
  );
  const {
    data: credits,
    isPending: creditsIsPending,
    error: creditsError,
  } = useFetch(
    ` https://api.themoviedb.org/3/${media}/${id}/credits?api_key=f7f5e53209dd58bafcd025bff2a1e966&language=en-US`
  );
  const {
    data: trailers,
    isPending: trailerIsPending,
    error: trailerError,
  } = useFetch(
    `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=f7f5e53209dd58bafcd025bff2a1e966&language=en-US`
  );

  useEffect(() => {
    const addToLocalStorage = () => {
      if (isPending || !data) {
        return;
      }

      if (!localStorage.getItem("recentlyViewed")) {
        const movieArray = [{ ...data, typeOfMedia: media }];
        localStorage.setItem("recentlyViewed", JSON.stringify(movieArray));
      } else {
        const recentlyViewedArray = JSON.parse(localStorage.getItem("recentlyViewed"));
        const filteredArray = recentlyViewedArray.filter((movie) => movie.id !== data.id);

        filteredArray.unshift({ ...data, typeOfMedia: media });

        let shortenedArray = [];

        for (let i = 0; i < 20; i++) {
          if (filteredArray[i]) {
            shortenedArray.push(filteredArray[i]);
          }
        }

        localStorage.setItem("recentlyViewed", JSON.stringify(shortenedArray));
      }
    };

    addToLocalStorage();
  }, [isPending, data, media]);

  const getMovieName = () => {
    let name = "";

    if (data.name) {
      name = data.name;
    } else {
      name = data.title;
    }

    return name;
  };

  const getDirector = () => {
    const director = credits.crew.find((crew) => crew.known_for_department === "Directing");

    if (!director) {
      return "";
    }

    return director.name;
  };

  const sortActors = (a, b) => {
    if (a.cast_id < b.cast_id) {
      return -1;
    }
    if (b.cast_id > a.cast_id) {
      return 1;
    }

    return 0;
  };

  const getActors = () => {
    const actors = credits.cast.sort(sortActors);
    let shortActorArray = [];

    for (let i = 0; i < 5; i++) {
      shortActorArray.push(actors[i]);
    }

    return shortActorArray;
  };

  const getTrailerLink = () => {
    const youtubeTrailer = trailers.results.find((trailer) => trailer.site === "YouTube");

    if (!youtubeTrailer) {
      return null;
    }

    return `https://www.youtube.com/embed/${youtubeTrailer.key}`;
  };

  const convertToHoursAndMin = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const isLoading = () => {
    if (isPending || creditsIsPending || trailerIsPending) {
      return true;
    }
    return false;
  };

  const errorHasOccured = () => {
    if (error || creditsError || trailerError) {
      return true;
    }
    return false;
  };

  return (
    <section>
      <div className="container">
        {errorHasOccured() && (
          <div className={classes.errorContainer}>
            <ErrorMessage />
          </div>
        )}
        {isLoading() && (
          <div className={classes.spinnerContainer}>
            <CircularProgress className={classes.spinner} color="inherit" size="10rem" />
          </div>
        )}
        {!isLoading() && !errorHasOccured() && (
          <div className={classes.header}>
            <h2>{getMovieName()}</h2>
            <div>
              <div className={classes.ratingContainer}>
                <AiFillStar className={classes.icon} />
                <div>
                  <h4 className={classes.ratingText}>{data.vote_average.toFixed(1)}/10</h4>
                  <p className={classes.voteCount}>{data.vote_count} Votes</p>
                </div>
              </div>
            </div>
            {data.runtime && <h3>{convertToHoursAndMin(data.runtime)}</h3>}
          </div>
        )}
        {!isLoading() && !errorHasOccured() && (
          <div className={classes.content}>
            <div className={classes.posterAndTrailer}>
              {data.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
                  alt={"Poster for " + getMovieName()}
                />
              )}
              {!data.poster_path && <img src={image_not_found} alt={"Could not find poster for " + getMovieName()} />}
              <div className={classes.iframeContainer}>
                <iframe
                  className={classes.trailer}
                  src={getTrailerLink()}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className={classes.genreContainer}>
              {data.genres &&
                data.genres.map((genre) => {
                  return (
                    <div className={classes.genre} key={genre.name}>
                      {genre.name}
                    </div>
                  );
                })}
            </div>
            <p className={classes.description}>{data.overview}</p>
            <div className={classes.castAndCrew}>
              {media === "movie" && (
                <div className={`${classes.directorRow} ${classes.row}`}>
                  <h4>Director:</h4>
                  <address rel="author">{getDirector()}</address>
                </div>
              )}
              <div className={`${classes.actorRow} ${classes.row}`}>
                <h4>Starring:</h4>
                {getActors() &&
                  getActors().map((actor) => {
                    if (!actor) {
                      return null;
                    }
                    return (
                      <div className={classes.actor} key={actor.name}>
                        <address rel="author">{actor.name}:</address>
                        <p>{actor.character}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieShowPage;
