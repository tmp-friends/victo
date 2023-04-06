import type { ApiContext, Hashtag } from "../../types/data"
import useSWR from "swr"

export type UseHashtagProps = {
  /**
   * 取得するハッシュタグID
   */
  id: number
  /**
   * Vtuber情報も取得するか
   */
  withVtuber?: boolean
  /**
   * 初期状態
   */
  initial?: Hashtag
}

export type UseHashtag = {
  /**
   * 取得したハッシュタグ
   */
  hashtag?: Hashtag
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
 * ハッシュタグAPI(個別取得)のカスタムフック
 * @param context APIコンテキスト
 * @returns ハッシュタグとAPI呼び出しの状態
 */
const useHashtag = (
  context: ApiContext,
  { id, withVtuber, initial }: UseHashtagProps
): UseHashtag => {
  const path = `${context.apiRootUrl}/v1/hashtags/${id}`
  const params = new URLSearchParams()
  withVtuber && params.append("withVtuber", withVtuber.toString())

  const { data, error } = useSWR<Hashtag>(path + "?" + params.toString())

  return {
    hashtag: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useHashtag
