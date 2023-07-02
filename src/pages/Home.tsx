import { Navigate } from "react-router-dom";
import Billboard from "../components/BillBoard";
import useMovieList from "../hooks/useMovieList";
import MovieList from "../components/MovieList";
import useCurrentUser from "../hooks/useCurrentUser";

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: currentUser } = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace={true} />
  } else {
    return (
      <>
        <Billboard />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies} />
        </div>
      </>
    );
  }
};

export default Home;
