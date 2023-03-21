import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useHashtagsSWR = (followingHashtags: number[] = []) => {
  const params = followingHashtags.length ? `&ids=${followingHashtags}` : ""
  const { data, error } = useSWR(
    `http://localhost:3001/v1/hashtags?withVtuber=true${params}`,
    fetcher,
  )

  return {
    hashtags: data,
    isLoading: !error && !data,
    isError: error,
  }
}
