import type { ApiContext, Tweet } from "../../types/data"
import useSWRInfinite from "swr/infinite"
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
  initial?: Tweet[][]
}

export type UseTweets = {
  /**
   * 取得したページごとのツイート配列
   * ex. [Array(50), Array(50), Array(50)]
   */
  tweetsChunks?: Tweet[][]
  /**
   * Loadingフラグ
   */
  isLoading: boolean
  /**
   * Errorフラグ
   */
  isError: boolean
  /**
   * 最後のページか判定フラグ
   */
  isLastPage: boolean
  /**
   * 追加読み込み関数
   */
  loadMore: () => void
}

/**
 * ツイートAPI(一括取得)のカスタムフック
 * @param context APIコンテキスト
 * @returns ツイートとAPI呼び出しの状態
 */
const useTweets = (
  context: ApiContext,
  { hashtagIds, limit = 50, offset, props, withMedia, initial }: UseTweetsProps
): UseTweets => {
  const path = `${context.apiRootUrl}/v1/tweets`
  const params = new URLSearchParams()

  hashtagIds && params.append("hashtag_ids", hashtagIds.join(","))
  limit && params.append("limit", limit.toString())
  offset && params.append("offset", offset.toString())
  props && params.append("props", props.join(","))
  withMedia && params.append("withMedia", withMedia.toString())

  // 各ページのSWRキーを取得する関数
  const getKey = (pageIndex: number, previousPageData: Tweet[]) => {
    if (previousPageData && !previousPageData.length) return null

    return path + "?" + params.toString() + `&offset=${pageIndex * limit}`
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, { initialSize: 1 })

  const loadMore = () => {
    setSize(size + 1)
  }

  const isLastPage = data && data.flat().length % limit !== 0 ? true : false

  return {
    tweetsChunks: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
    isLastPage,
    loadMore,
  }
}

export default useTweets
