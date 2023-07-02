import useSwr from "swr";
import fetcher from "../libs/fetcher";
import { baseURL } from "../api/api";
import { useReadLocalStorage } from "usehooks-ts";

const useBillboard = () => {
  const token = useReadLocalStorage('access_token');
  const { data, error, isLoading } = useSwr(
    [`${baseURL}/movies/random`, token],
    ([url, token]) => fetcher(url, token as string),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  
  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard;
