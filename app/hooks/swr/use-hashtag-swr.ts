import useSWR from "swr"
import { fetcher } from "./fetcher"

export const useHashtagSWR = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/hashtags/${id}?withVtuber=true`,
    fetcher,
  )

  return {
    hashtag: data,
    isLoading: !error && !data,
    isError: error,
  }
}
