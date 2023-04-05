import axios from "axios"
import { ApiContext, Hashtag } from "../../types/data"

export type GetHahstagParams = {
  /**
   * 取得するハッシュタグID
   */
  id: number
  /**
   * Vtuber情報も取得するか
   */
  withVtuber?: boolean
}

const getHashtag = async (
  context: ApiContext,
  { id, withVtuber }: GetHahstagParams,
): Promise<Hashtag> => {
  const path = `${context.apiRootUrl}/v1/hashtags/${id}`
  const params = new URLSearchParams()

  withVtuber && params.append("withVtuber", withVtuber.toString())

  const res = await axios.get(
    path,
    { params },
  )

  return res.data
}

export default getHashtag
