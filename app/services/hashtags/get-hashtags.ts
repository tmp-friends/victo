import axios from "axios"

import { ApiContext, Hashtag } from "../../types/data"

export type GetHahstagsParams = {
  /**
   * 取得するハッシュタグIDの配列
   */
  ids?: number[]
  /**
   * Vtuber情報も取得するか
   */
  withVtuber?: boolean
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
}

const getHashtags = async (
  context: ApiContext,
  { ids, withVtuber, limit, offset, props }: GetHahstagsParams = {}
): Promise<Hashtag[]> => {
  const path = `${context.apiRootUrl}/v1/hashtags`
  const params = new URLSearchParams()

  ids && params.append("ids", ids.join(","))
  withVtuber && params.append("withVtuber", withVtuber.toString())
  limit && params.append("limit", limit.toString())
  offset && params.append("offset", offset.toString())
  props && params.append("props", props.join(","))

  const res = await axios.get(
    path,
    { params, withCredentials: true },
  )

  return res.data
}

export default getHashtags
