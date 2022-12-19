import MovieRow from "../components/MovieRow";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const {
    data: trendingMovieData,
    isPending: trendingMoviePending,
    error: trendingMovieError,
  } = useFetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
  const {
    data: trendingTvData,
    isPending: trendingTvPending,
    error: trendingTvError,
  } = useFetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`);
  const {
    data: topMovieData,
    isPending: topMoviePending,
    error: topMovieError,
  } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&with_watch_monetization_types=flatrate`
  );

  const {
    data: topTvData,
    isPending: topTvPending,
    error: topTvError,
  } = useFetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=1`);

  const recentlyViewedData = {
    results: JSON.parse(localStorage.getItem("recentlyViewed")),
  };
  const RecentlyViewedPending = false;
  const recentlyViewedError = false;

  return (
    <section>
      <div className="container">
        <MovieRow
          title={"Trending movies"}
          data={trendingMovieData}
          isPending={trendingMoviePending}
          error={trendingMovieError}
          typeOfMedia={"movie"}
        />
        <MovieRow
          title={"Trending TV shows"}
          data={trendingTvData}
          isPending={trendingTvPending}
          error={trendingTvError}
          typeOfMedia={"tv"}
        />
        <MovieRow
          title={"Top rated movies"}
          data={topMovieData}
          isPending={topMoviePending}
          error={topMovieError}
          typeOfMedia={"movie"}
        />
        <MovieRow
          title={"Top rated TV shows"}
          data={topTvData}
          isPending={topTvPending}
          error={topTvError}
          typeOfMedia={"tv"}
        />
        {localStorage.getItem("recentlyViewed") && (
          <MovieRow
            title={"Recently viewed"}
            data={recentlyViewedData}
            isPending={RecentlyViewedPending}
            error={recentlyViewedError}
            typeOfMedia={"movie"}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
