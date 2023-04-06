import axios from "axios"
import { ApiContext, Hashtag } from "../../types/data"

export type GetFollowingHahstagParams = {
  /**
   * 取得するハッシュタグID
   */
  id: number
}

const getFollowingHashtags = async (
  context: ApiContext,
  { id }: GetFollowingHahstagParams,
): Promise<Hashtag> => {
  const path = `${context.apiRootUrl}/v1/hashtags/1`
  // const path = `${context.apiRootUrl}/v1/hashtags/${id}`

  const res = await axios.get(path)

  return res.data
}

export default getFollowingHashtags
