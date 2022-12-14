import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import classes from "./MovieShowPage.module.css";
import { AiFillStar } from "react-icons/ai";

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

  const getDirector = () => {
    const director = credits.crew.find((crew) => crew.known_for_department === "Directing");
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

  const getMovieName = () => {
    let name;

    if (data.name) {
      name = data.name;
    } else {
      name = data.title;
    }

    return name;
  };

  const convertToHoursAndMin = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  if (isPending || creditsIsPending) {
    return <div>Loading...</div>;
  }

  if (error || creditsError) {
    return <div>Could not find</div>;
  }

  return (
    <section>
      <div className="container">
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
        <div className={classes.imagesAndVideos}>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
            alt={"Poster of " + getMovieName()}
          />
        </div>
        <div className="content">
          {data.genres.map((genre) => {
            return (
              <div className={classes.genre} key={genre.name}>
                {genre.name}
              </div>
            );
          })}
          <p className={classes.description}>{data.overview}</p>
          <div className={classes.castAndCrew}>
            {media === "movie" && (
              <div className={classes.directorRow}>
                <h4>{getDirector()}</h4>
              </div>
            )}
            <div className={classes.actorRow}>
              {getActors().map((actor) => {
                return (
                  <div className={classes.actor} key={actor.name}>
                    <h4>{actor.name}</h4>
                    <h5>{actor.character}</h5>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieShowPage;
