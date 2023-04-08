import type { NextPage } from "next"
import { useEffect, useState } from "react"

import { Avatar, Divider, Wrap, WrapItem } from "@chakra-ui/react"

import { ApiContext, Hashtag } from "../types/data"
import EmbedTweets from "../components/organisms/EmbedTweets"
import { useFollowingHashtagsContext } from "../contexts/FollowingHashtagsContext"
import useTweets from "../services/tweets/use-tweets"

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_ROOT_URL ?? "http://localhost:3001",
}

const TopPage: NextPage = () => {
  const { followingHashtags, isLoading } = useFollowingHashtagsContext()

  // followingHashtagsがオブジェクトで返ってくるので配列形式に変換する
  const hashtags: Hashtag[] = []
  const hashtagIds: number[] = []
  for (const v of followingHashtags ?? []) {
    hashtags.push(v)
    hashtagIds.push(v.id)
  }

  const [dispHashtag, setDispHashtag] = useState<number[]>([])
  useEffect(() => {
    if (hashtagIds.length > 0) {
      setDispHashtag(hashtagIds)
    }
  }, [followingHashtags])

  const tweetsData = useTweets(context, { hashtagIds: dispHashtag, limit: 20, withMedia: true })

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Wrap>
            {hashtags.map((v: Hashtag, i: number) => (
              // AvatarでフォローしているHashtagのVtuberを表示する
              <WrapItem key={i} onClick={() => setDispHashtag([v.id])}>
                <Avatar
                  size="lg"
                  name={v.name ?? ""}
                  src={v.profile_image_url ?? ""}
                />
              </WrapItem>
            )
            )}
          </Wrap>

          <Divider my={4} />

          {tweetsData.isLoading ? <div>Loading...</div> : EmbedTweets({ tweets: tweetsData.tweets })}
        </>
      )
      }
    </>
  )
}

export default TopPage
