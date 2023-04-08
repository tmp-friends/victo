import type { ApiContext, Tweet } from "../../types/data"
import useSWR from "swr"
import { fetcher } from "../fetcher"

export type UseTweetsProps = {
  /**
   * 取得するハッシュタグID
   */
  hashtagIds?: number[]
  /**
   * 取得数
   */
  limit?: number
  /**
   * 開始番号
   */
  offset?: number
  /**
   * 取得フィールド名
   */
  props?: string[]
  /**
   * 取得フィールド名
   */
  withMedia?: boolean
  /**
   * 初期状態
   */
  initial?: Tweet[]
}

export type UseTweets = {
  /**
   * 取得したツイート配列
   */
  tweets?: Tweet[]
  /**
   * Loadingフラグ
   */
  isLoading: boolean
  /**
   * Errorフラグ
   */
  isError: boolean
}

/**
 * ツイートAPI(一括取得)のカスタムフック
 * @param context APIコンテキスト
 * @returns ツイートとAPI呼び出しの状態
 */
const useTweets = (
  context: ApiContext,
  { hashtagIds, limit, offset, props, withMedia, initial }: UseTweetsProps
): UseTweets => {
  const path = `${context.apiRootUrl}/v1/tweets`
  const params = new URLSearchParams()

  hashtagIds && params.append("hashtag_ids", hashtagIds.join(","))
  limit && params.append("limit", limit.toString())
  offset && params.append("offset", offset.toString())
  props && params.append("props", props.join(","))
  withMedia && params.append("withMedia", withMedia.toString())

  const { data, error } = useSWR<Tweet[]>(
    path + "?" + params.toString(),
    fetcher,
  )

  return {
    tweets: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useTweets
