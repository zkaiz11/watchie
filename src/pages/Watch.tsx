import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMovie from "../hooks/useMovie";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Watch = () => {
  const location = useLocation()
  const movieId = location.state?.movieId;
  const { data } = useMovie(movieId as number);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(movieId)
  })
  const back = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon
          onClick={() => back()}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
