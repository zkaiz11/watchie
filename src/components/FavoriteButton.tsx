import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

import useCurrentUser from "../hooks/useCurrentUser";
import useFavorites from "../hooks/useFavoriteMovie";
import { baseURL } from "../api/api";
import { useReadLocalStorage } from "usehooks-ts";

interface FavoriteButtonProps {
  movieId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const token = useReadLocalStorage("access_token");
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favorite_movies || [];
    const result = list.some(({ id }) => id == movieId);

    return result;
  }, [currentUser?.favorite_movies, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    const req_body = {
      id: movieId,
    };

    console.log(isFavorite);

    if (isFavorite) {
      response = await axios.delete(`${baseURL}/users/favoritemovies`, {
        headers: { Authorization: "Bearer " + token },
        data: req_body,
      });
    } else {
      response = await axios.post(`${baseURL}/users/favoritemovies`, req_body, {
        headers: { Authorization: "Bearer " + token },
      });
    }
    mutate(
      {
        ...currentUser,
        favorite_movies: response.data,
      },
      {
        optimisticData: {
          ...currentUser,
          favorite_movies: response.data,
        },
        rollbackOnError: true,
        revalidate: false,
      }
    );
    mutateFavorites(response.data, false);
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites, token]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
