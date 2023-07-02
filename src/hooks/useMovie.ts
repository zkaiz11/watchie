import useSwr from 'swr'
import fetcher from '../libs/fetcher';
import { baseURL } from '../api/api';

const useMovie = (id?: number) => {
  const { data, error, isLoading } = useSwr(id ? `${baseURL}/movies/${id}` : null, fetcher, {
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

export default useMovie;
