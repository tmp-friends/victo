import { TweetObject } from './../../types/tweet-object';
import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useTweetsSWR = (hashtagIds: number[] = []) => {
  const params = hashtagIds.length ? `&hashtag_ids=${hashtagIds}` : ""
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/tweets?props=tweet_id,hashtag_id&limit=20${params}`,
    fetcher,
  )

  return {
    tweets: data as TweetObject[],
    isLoading: !error && !data,
    isError: error,
  }
}
