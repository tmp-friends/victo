import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Icon, Img, SimpleGrid, Spacer, Text } from "@chakra-ui/react"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet"
import { FcLike } from "@react-icons/all-files/fc/FcLike"

import { Tweet } from "../../../types/data"

interface EmbedTweetsProps {
  /**
   * 取得したページごとのツイート配列
   * ex. [Array(50), Array(50), Array(50)]
   */
  tweetsChunks?: Tweet[][]
}

const EmbedTweets: React.FC<EmbedTweetsProps> = ({ tweetsChunks }) => {
  const handleCardClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <>
      {tweetsChunks === undefined || tweetsChunks.flat().length === 0 ? (
        <Text fontWeight="semibold" align="center" pb={4}>
          Tweets not found
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} alignItems="flex-start" spacingX={4} spacingY={8}>
          {tweetsChunks.map((tweets) => (
            Array.isArray(tweets) && tweets.map((v, i) => (

              <Card
                key={i}
                size="sm"
                variant="elevated"
                onClick={() => handleCardClick(v.url)}
              >

                <CardHeader>
                  <Flex alignItems="center">
                    <Flex alignItems="center">
                      <Avatar name={v.author_username} src={v.author_profile_image_url} />
                      <Box ml={3}>
                        <Heading size="sm">{v.author_name}</Heading>
                        <Text>@{v.author_username}</Text>
                      </Box>
                    </Flex>
                    <Spacer />
                    <Icon
                      as={FaTwitter}
                      boxSize={6}
                      color="twitter.400"
                    />
                  </Flex>
                </CardHeader>

                <CardBody>
                  <Text>{v.text}</Text>
                </CardBody>

                <Img
                  src={v.media_url[0]}
                  alt={v.text}
                  mx="auto"
                  maxH="400px"
                  borderRadius="lg"
                  loading="lazy"
                />

                <CardFooter my={3}>
                  <Flex alignItems="center" mx="auto">
                    <Icon
                      as={FaRetweet}
                      boxSize={5}
                      color="green.400"
                    />
                    <Text ml={2} mr={10} fontWeight="semibold">{v.retweet_count}</Text>

                    <Icon
                      as={FcLike}
                      boxSize={4}
                    />
                    <Text ml={2} fontWeight="semibold">{v.like_count}</Text>
                  </Flex>
                </CardFooter>

              </Card>

            ))
          ))}
        </SimpleGrid>
      )
      }
    </>
  )
}

export default EmbedTweets
