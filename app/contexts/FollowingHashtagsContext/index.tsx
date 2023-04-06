import { createContext, useContext } from "react"

import { useAuthContext } from "../AuthContext"
import follow from "../../services/hashtags/follow"
import unfollow from "../../services/hashtags/unfollow"
import useFollowingHashtags from "../../services/users/use-following-hashtags"
import { Hashtag, ApiContext } from "../../types/data"

type FollowingHashtagsContextType = {
  followingHashtags?: Hashtag[]
  isLoading: boolean
  follow: (hashtagId: number) => Promise<void>
  unfollow: (hashtagId: number) => Promise<void>
  mutate: (
    data?: Hashtag[] | Promise<Hashtag[]>,
    shouldRevalidate?: boolean,
  ) => Promise<Hashtag[] | undefined>
}

type FollowingHashtagsContextProviderProps = {
  context: ApiContext,
  followingHashtags?: Hashtag[],
}

const FollowingHashtagsContext = createContext<FollowingHashtagsContextType>({
  followingHashtags: undefined,
  isLoading: false,
  follow: async () => Promise.resolve(),
  unfollow: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
})

export const useFollowingHashtagsContext = (): FollowingHashtagsContextType => {
  return useContext<FollowingHashtagsContextType>(FollowingHashtagsContext)
}

/**
 * コンテキストプロバイダー
 *
 * @param params パラメータ
 */
export const FollowingHashtagsContextProvider = ({
  context,
  followingHashtags,
  children,
}: React.PropsWithChildren<FollowingHashtagsContextProviderProps>) => {
  const { authUser } = useAuthContext()
  const { hashtags, isLoading, mutate } = useFollowingHashtags(context, { userId: authUser?.id, withVtuber: true })

  const followInternal = async (hashtagId: number) => {
    await follow(context, { hashtagId, user: authUser })
    await mutate()
  }

  const unfollowInternal = async (hashtagId: number) => {
    await unfollow(context, { hashtagId, user: authUser })
    await mutate()
  }

  return (
    <FollowingHashtagsContext.Provider
      value={{
        followingHashtags: hashtags ?? followingHashtags,
        isLoading,
        follow: followInternal,
        unfollow: unfollowInternal,
        mutate,
      }}
    >{children}</FollowingHashtagsContext.Provider>
  )
}
