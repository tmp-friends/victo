import axios from "axios"
import { useUserContext } from "../provider/user-context"

export const follow = async (hashtagId: number) => {
  const user = useUserContext()

  try {
    await axios.post(
      "http://localhost:3001/v1/hashtags/follow",
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
