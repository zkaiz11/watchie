import useSwr from "swr";
import fetcher from "../libs/fetcher";
import { baseURL } from "../api/api";
import { useReadLocalStorage } from "usehooks-ts";

const useCurrentUser = () => {
  const token = useReadLocalStorage('access_token');
  const { data, error, isLoading, mutate } = useSwr(
    [`${baseURL}/users/currentuser`, token],
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
    mutate
  };
};

export default useCurrentUser;
