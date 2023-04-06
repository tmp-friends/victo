import axios from 'axios'

import { ApiContext, TweetObject } from "../../types/data"

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
}

const getTweets = async (
  context: ApiContext,
  { hashtagIds, limit, offset, props }: GetTweetsParams = {}
): Promise<TweetObject[]> => {
  const path = `${context.apiRootUrl}/v1/tweets`
  const params = new URLSearchParams()

  hashtagIds && params.append("hashtag_ids", hashtagIds.join(","))
  limit && params.append("limit", limit.toString())
  offset && params.append("offset", offset.toString())
  props && params.append("props", props.join(","))

  const res = await axios.get(
    path,
    { params, withCredentials: true },
  )

  return res.data
}

export default getTweets
