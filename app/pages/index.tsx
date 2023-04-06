import type { NextPage } from "next"
import { useState } from "react"

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
  const l: Hashtag[] = []
  const hashtagIds: number[] = []
  for (const v of followingHashtags ?? []) {
    l.push(v)
    hashtagIds.push(v.id)
  }

  const [dispHashtag, setDispHashtag] = useState<number[]>(hashtagIds)

  const { tweets } = useTweets(context, { hashtagIds: dispHashtag, limit: 20 })

  const tweetIds: string[] = []
  for (const v of tweets ?? []) {
    tweetIds.push(v.tweet_id)
  }

  return (
    <>
      <Wrap>
        {
          isLoading
            ? <div>Loading...</div>
            : l?.map((v: Hashtag, i: number) => {
              return (
                // AvatarでフォローしているHashtagのVtuberを表示する
                <WrapItem key={i} onClick={() => setDispHashtag([v.id])}>
                  <Avatar
                    size="lg"
                    name={v.name ?? ""}
                    src={v.profile_image_url ?? ""}
                  />
                </WrapItem>
              )
            })
        }
      </Wrap>

      <Divider my={4} />

      {/* Hashtag毎のツイートを表示する */}
      {EmbedTweets({ tweetIds })}
    </>
  )
}


export default TopPage
