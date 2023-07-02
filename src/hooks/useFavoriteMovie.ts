import useSwr from 'swr'
import fetcher from '../libs/fetcher';
import { baseURL } from '../api/api';
import { useReadLocalStorage } from 'usehooks-ts';

const useFavoriteMovies = () => {
  const token = useReadLocalStorage('access_token');
  const { data, error, isLoading, mutate } = useSwr(
    [`${baseURL}/users/favoritemovies`, token],
    ([url, token]) => fetcher(url, token as string),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useFavoriteMovies;
