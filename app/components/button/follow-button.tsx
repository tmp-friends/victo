import { FC, useEffect, useState } from "react"
import { Button } from "@chakra-ui/react"

import { useUserContext } from "../../provider/user-context"
import { follow, unfollow } from "../../hooks/follow"

export const FollowButton: FC<number> = (hashtagId) => {
  const user = useUserContext()

  const [isFollowing, setIsFollowing] = useState<boolean>(
    user?.following_hashtags?.includes(hashtagId) ?? false
  )

  // HACK: SWRでのhashtagIdの取得に時間がかかるのでuseEffectで状態監視をしている
  // TODO: SWRのloading中の処理の出しわけが必要
  useEffect(() => {
    setIsFollowing(user?.following_hashtags?.includes(hashtagId) ?? false)
  }, [hashtagId])

  const handleClick = async () => {
    !isFollowing ? await follow(hashtagId) : await unfollow(hashtagId)

    setIsFollowing(!isFollowing)
  }

  return (
    <>
      {
        isFollowing ? (
          <Button
            size="lg"
            colorScheme="gray"
            ml={10}
            onClick={handleClick}
          >フォロー中</Button>
        ) : (
          <Button
            size="lg"
            colorScheme="teal"
            ml={10}
            onClick={handleClick}
          >フォロー</Button>
        )}
    </>
  )
}
