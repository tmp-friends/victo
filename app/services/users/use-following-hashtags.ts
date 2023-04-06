import { fetcher } from "../fetcher"
import useSWR from "swr"

import { ApiContext, Hashtag } from "../../types/data"

export type UseFollowingHashtagsProps = {
  /**
   * 取得するユーザID
   */
  userId?: number
  /**
   * Vtuber情報も取得するか
   */
  withVtuber?: boolean
  /**
   * 取得フィールド名
   */
  props?: string[]
}

export type UseFollowingHashtags = {
  /**
   * 取得したユーザ情報
   */
  hashtags?: Hashtag[]
  /**
   * Loadingフラグ
   */
  isLoading: boolean
  /**
   * Errorフラグ
   */
  isError: boolean
  /**
   * Mutate
   */
  mutate: (
    data?: Hashtag[] | Promise<Hashtag[]>,
    shouldRevalidate?: boolean,
  ) => Promise<Hashtag[] | undefined>
}

/**
 * ハッシュタグAPI(フォロー中ハッシュタグ取得)のカスタムフック
 * @param context APIコンテキスト
 * @returns ハッシュタグとAPI呼び出しの状態
 */
const useFollowingHashtags = (
  context: ApiContext,
  { userId, withVtuber, props }: UseFollowingHashtagsProps,
): UseFollowingHashtags => {
  const path = `${context.apiRootUrl}/v1/users/${userId}/following_hashtags`
  const params = new URLSearchParams()

  withVtuber && params.append("withVtuber", withVtuber.toString())
  props && params.append("props", props.join(","))

  const { data, error, mutate } = useSWR<Hashtag[]>(
    path + "?" + params.toString(),
    fetcher,
  )

  return {
    hashtags: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  }
}

export default useFollowingHashtags
