import MovieRow from "../components/MovieRow";

const Home = () => {
  const trendingUrl = "https://api.themoviedb.org/3/trending/all/week?api_key=f7f5e53209dd58bafcd025bff2a1e966";

  return (
    <section>
      <div className="container">
        <MovieRow title={"Trending"} url={trendingUrl} />
      </div>
    </section>
  );
};

export default Home;
