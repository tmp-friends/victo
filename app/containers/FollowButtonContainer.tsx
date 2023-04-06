import { Button, Spinner } from "@chakra-ui/react"

import { useAuthContext } from "../contexts/AuthContext"
import { useFollowingHashtagsContext } from "../contexts/FollowingHashtagsContext"
import { useGlobalSpinnerActionsContext } from "../contexts/GlobalSpinnerContext"

interface FollowButtonContainerProps {
  /**
   * ハッシュタグID
   */
  hashtagId: number
}

/**
 * フォローボタンコンテナ
 */
const FollowButtonContainer = ({ hashtagId }: FollowButtonContainerProps) => {
  const { authUser } = useAuthContext()
  const isLogin = authUser && authUser.id !== undefined

  const { followingHashtags, isLoading, follow, unfollow } = useFollowingHashtagsContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()

  const followingHashtagIds: number[] = []
  for (const v of followingHashtags ?? []) {
    followingHashtagIds.push(v.id)
  }

  // フォローボタンを押したとき
  const handleFollow = async () => {
    setGlobalSpinner(true)
    try {
      await follow(hashtagId)
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  // フォロー中ボタンを押したとき
  const handleUnfollow = async () => {
    setGlobalSpinner(true)
    try {
      await unfollow(hashtagId)
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return (
    <>
      {(() => {
        if (!isLogin) {
          return <></>
        }

        if (isLoading) {
          return <Spinner />
        } else {
          return (
            followingHashtagIds.includes(hashtagId) ? (
              <Button
                size="lg"
                colorScheme="gray"
                ml={10}
                onClick={handleUnfollow}
              >フォロー中</Button>
            ) : (
              <Button
                size="lg"
                colorScheme="teal"
                ml={10}
                onClick={handleFollow}
              >フォロー</Button>
            )
          )
        }
      })()}
    </>
  )
}

export default FollowButtonContainer
