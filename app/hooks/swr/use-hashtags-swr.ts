import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useHashtagsSWR = (followingHashtags: number[] = []) => {
  const params = followingHashtags.length ? `&ids=${followingHashtags}` : ""
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/hashtags?withVtuber=true${params}`,
    fetcher,
  )

  return {
    hashtags: data,
    isLoading: !error && !data,
    isError: error,
  }
}
