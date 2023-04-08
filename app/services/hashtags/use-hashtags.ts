import type { ApiContext, Hashtag } from "../../types/data"
import useSWR from "swr"

export type UseHashtagsProps = {
  /**
   * 取得するハッシュタグIDの配列
   */
  ids?: number[]
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
   * Vtuber情報も取得するか
   */
  withVtuber?: boolean
  /**
   * 初期状態
   */
  initial?: Hashtag[]
}

export type UseHashtag = {
  /**
   * 取得したハッシュタグ
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
}

/**
 * ハッシュタグAPI(一括取得)のカスタムフック
 * @param context APIコンテキスト
 * @returns ハッシュタグとAPI呼び出しの状態
 */
const useHashtags = (
  context: ApiContext,
  { ids, limit, offset, props, withVtuber, initial }: UseHashtagsProps
): UseHashtag => {
  const path = `${context.apiRootUrl}/v1/hashtags`
  const params = new URLSearchParams()

  ids && params.append("ids", ids.join(","))
  limit && params.append("limit", limit.toString())
  offset && params.append("offset", offset.toString())
  props && params.append("props", props.join(","))
  withVtuber && params.append("withVtuber", withVtuber.toString())

  const { data, error } = useSWR<Hashtag[]>(path + "?" + params.toString())

  return {
    hashtags: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useHashtags
