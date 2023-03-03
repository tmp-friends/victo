import { FC } from "react";
import { Text, SimpleGrid } from "@chakra-ui/react";
import TwitterTweetEmbed from "react-tweet-embed";
import { TweetObject } from "../types/tweet-object";

export const Tweets: FC<TweetObject[]> = (tweets: TweetObject[]) => {
  if (!tweets?.length) {
    return (
      <Text fontWeight="semibold" align="center">
        Tweets not found
      </Text>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
      {tweets.map((v: TweetObject, i: number) => (
        <TwitterTweetEmbed key={i} tweetId={v.tweet_id} />
      ))}
    </SimpleGrid>
  )
}
