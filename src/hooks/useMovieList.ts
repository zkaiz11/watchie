import useSwr from 'swr'
import fetcher from '../libs/fetcher';
import { baseURL } from '../api/api';

const useMovies = () => {
  const { data, error, isLoading } = useSwr(`${baseURL}/movies`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovies;
