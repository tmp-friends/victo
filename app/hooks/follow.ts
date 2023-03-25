import axios from "axios"
import { useUserContext } from "../provider/user-context"

export const follow = async (hashtagId: number) => {
  const user = useUserContext()

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/hashtags/follow`,
      {
        id: hashtagId,
        user_id: user?.id,
      },
      { withCredentials: true },
    )

    // フォローしたHashtagをuserのfollowing_hashtagsに追加する
    user?.following_hashtags.push(hashtagId)
  } catch (err) {
    console.log(err)
  }
}

export const unfollow = async (hashtagId: number) => {
  const user = useUserContext()

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/hashtags/unfollow`,
      {
        id: hashtagId,
        user_id: user?.id,
      },
      { withCredentials: true },
    )

    // フォローしたHashtagをuserのfollowing_hashtagsから削除する
    if (user) {
      user.following_hashtags = user.following_hashtags.filter(
        (v) => v !== hashtagId,
      )
    }
  } catch (err) {
    console.log(err)
  }
}
