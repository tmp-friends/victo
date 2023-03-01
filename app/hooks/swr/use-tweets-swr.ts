import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useTweetsSWR = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(`http://localhost:3001/tweets/hashtag/${id}?props=tweet_id&limit=10`, fetcher)

  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  }
}
