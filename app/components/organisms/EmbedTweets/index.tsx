import { SimpleGrid, Text } from "@chakra-ui/react"
import TwitterTweetEmbed from "react-tweet-embed"

interface EmbedTweetsProps {
  /**
   * TweetIDの配列
   */
  tweetIds: string[]
}

const EmbedTweets: React.FC<EmbedTweetsProps> = ({ tweetIds }) => {
  if (tweetIds === undefined || !tweetIds.length) {
    return (
      <Text fontWeight="semibold" align="center">
        Tweets not found
      </Text>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
      {tweetIds.map((tweetId, i) => (
        <TwitterTweetEmbed key={i} tweetId={tweetId} />
      ))}
    </SimpleGrid>
  )
}

export default EmbedTweets
