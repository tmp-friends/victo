import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useHashtagSWR = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(
    `http://localhost:3001/v1/hashtags/${id}?withVtuber=true`,
    fetcher,
  )

  return {
    hashtag: data,
    isLoading: !error && !data,
    isError: error,
  }
}
