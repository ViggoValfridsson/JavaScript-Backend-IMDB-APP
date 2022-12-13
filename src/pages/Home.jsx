import MovieRow from "../components/MovieRow";

const Home = () => {
  const trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=f7f5e53209dd58bafcd025bff2a1e966";
  const trendingShowsUrl = "https://api.themoviedb.org/3/trending/tv/week?api_key=f7f5e53209dd58bafcd025bff2a1e966";
  const topRatedUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&with_watch_monetization_types=flatrate";
  const topRatedTVUrl = " https://api.themoviedb.org/3/tv/top_rated?api_key=f7f5e53209dd58bafcd025bff2a1e966&page=1";

  return (
    <section>
      <div className="container">
        <MovieRow title={"Trending movies"} url={trendingMoviesUrl} typeOfMedia={"movie"} />
        <MovieRow title={"Trending TV shows"} url={trendingShowsUrl} typeOfMedia={"tv"} />
        <MovieRow title={"Top rated movies"} url={topRatedUrl} typeOfMedia={"movie"} />
        <MovieRow title={"Top rated TV shows"} url={topRatedTVUrl} typeOfMedia={"tv"} />

      </div>
    </section>
  );
};

export default Home;
