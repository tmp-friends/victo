import axios from 'axios'

import { ApiContext, Tweet } from "../../types/data"

export type GetTweetsParams = {
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
}

const getTweets = async (
  context: ApiContext,
  { hashtagIds, limit, offset, props, withMedia }: GetTweetsParams = {}
): Promise<Tweet[]> => {
  const path = `${context.apiRootUrl}/v1/tweets`
  const params = new URLSearchParams()

  hashtagIds && params.append("hashtag_ids", hashtagIds.join(","))
  limit && params.append("limit", limit.toString())
  offset && params.append("offset", offset.toString())
  props && params.append("props", props.join(","))
  withMedia && params.append("withMedia", withMedia.toString())

  const res = await axios.get(
    path,
    { params, withCredentials: true },
  )

  return res.data
}

export default getTweets
