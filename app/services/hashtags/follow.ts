import { ApiContext, User } from './../../types/data.d'
import axios from "axios"

export type FollowParams = {
  /**
   * フォローするHashtagのID
   */
  hashtagId: number
  /**
   * ログインしているユーザ
   */
  user?: User
}

const follow = async (
  context: ApiContext,
  { hashtagId, user }: FollowParams
): Promise<void> => {
  if (!user) {
    return
  }

  await axios.post(
    `${context.apiRootUrl}/v1/hashtags/follow`,
    {
      id: hashtagId,
      user_id: user.id,
    },
    { withCredentials: true },
  )
}

export default follow
