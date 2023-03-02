import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useTweetsByHashtagIdSWR = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(
    `http://localhost:3001/v1/tweets/hashtag/${id}?props=tweet_id&limit=20`,
    fetcher,
  )

  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  }
}
