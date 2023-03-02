import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useHashtagsSWR = () => {
  const { data, error } = useSWR(
    "http://localhost:3001/v1/hashtags?withVtuber=true",
    fetcher,
  )

  return {
    hashtags: data,
    isLoading: !error && !data,
    isError: error,
  }
}
