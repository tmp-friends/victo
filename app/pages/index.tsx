import type { NextPage } from "next";
import { Avatar, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import { useUserContext } from "../provider/user-context";
import { useHashtagsSWR } from "../hooks/swr/use-hashtags-swr";
import { Hashtag } from "../types/hashtag";
import { Tweets } from "../components/tweets";
import { useTweetsSWR } from "../hooks/swr/use-tweets-swr";
import { useState } from "react";

const TopPage: NextPage = () => {
  const user = useUserContext()

  const followingHashtags = user?.following_hashtags ?? []
  const [dispHashtag, setDispHashtag] = useState<number[]>(followingHashtags)

  const { hashtags } = useHashtagsSWR(followingHashtags)
  const { tweets, isLoading, isError } = useTweetsSWR(dispHashtag)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      {/* AvatarでフォローしているHashtagのVtuberを表示する */}
      <Wrap>
        {
          hashtags?.map((v: Hashtag, i: number) => {
            return (
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
      {Tweets(tweets)}
    </>
  )
}

export default TopPage
