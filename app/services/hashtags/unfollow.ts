import { ApiContext, User } from '../../types/data'
import axios from "axios"

export type UnfollowParams = {
  /**
   * フォロー解除するHashtagのID
   */
  hashtagId: number
  /**
   * ログインしているユーザ
   */
  user?: User
}

const unfollow = async (
  context: ApiContext,
  { hashtagId, user }: UnfollowParams
): Promise<void> => {
  if (!user) {
    return
  }

  await axios.post(
    `${context.apiRootUrl}/v1/hashtags/unfollow`,
    {
      id: hashtagId,
      user_id: user.id,
    },
    { withCredentials: true },
  )
}

export default unfollow
