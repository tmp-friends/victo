import { Text, Box, Button } from "@chakra-ui/react"

import { ApiContext, Tweet } from "../types/data"
import EmbedTweets from "../components/organisms/EmbedTweets"
import useTweets from "../services/tweets/use-tweets"
import { useState } from "react"

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_ROOT_URL ?? "http://localhost:3001",
}

interface EmbedTweetsContainerProps {
  /**
   * ハッシュタグIDの配列
   */
  hashtagIds: number[]
  /**
   * SSGで取得したツイート配列
   */
  initial?: Tweet[][]
}

const EmbedTweetsContainer = ({ hashtagIds, initial }: EmbedTweetsContainerProps) => {
  const { tweetsChunks, isLoading, isLastPage, loadMore } = useTweets(
    context,
    {
      hashtagIds,
      limit: 50,
      withMedia: true,
      initial,
    }
  )

  const [isLoadingForLoadMore, setIsLoadingForLoadMore] = useState(false)

  const handleLoadMore = async () => {
    setIsLoadingForLoadMore(true)

    try {
      await loadMore()
    } finally {
      setIsLoadingForLoadMore(false)
    }
  }

  return (
    <>
      {isLoading
        ? (
          <Text fontWeight="semibold" align="center" >
            Loading...
          </Text >
        ) : (
          <>
            {EmbedTweets({ tweetsChunks })}
            {tweetsChunks && tweetsChunks.flat().length > 0 && !isLastPage && (
              <Box m={4}>
                <Button
                  display="block"
                  mx="auto"
                  size="lg"
                  variant="outline"
                  colorScheme="twitter"
                  isLoading={isLoadingForLoadMore}
                  onClick={handleLoadMore}
                >Load more!</Button>
              </Box>

            )}

          </>
        )}
    </>
  )
}

export default EmbedTweetsContainer
