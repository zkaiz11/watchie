import MovieList from "../components/MovieList";
import useFavoriteMovies from "../hooks/useFavoriteMovie";

const Favorite = () => {
   const { data: favorites } = useFavoriteMovies();
  return (
    <div className="relative h-[56.25vw]">
      <div className="h-[10vw]"></div>
      <MovieList data={favorites} title="My List"/>
    </div>
  )
}

export default Favorite