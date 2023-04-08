import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react"
import { Tweet } from "../../../types/data"

interface EmbedTweetsProps {
  /**
   * Tweetの配列
   */
  tweets?: Tweet[]
}

const EmbedTweets: React.FC<EmbedTweetsProps> = ({ tweets }) => {
  return (
    <>
      {!Array.isArray(tweets) || tweets.length === 0 ? (
        <Text fontWeight="semibold" align="center">
          Tweets not found
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
          {tweets.map((v, i) => (
            <Card key={i} variant="elevated">
              <CardHeader>
                <Flex>
                  <Flex>

                    <Avatar name="test" src="https://bit.ly/sage-adebayo" />
                    <Box>
                      <Heading size="sm">Author Name</Heading>
                      <Text>Author UID</Text>
                    </Box>

                    {/* TODO: TwitterIcon */}

                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{v.text}</Text>
              </CardBody>
              <Image
                objectFit="cover"
                src={v.media_url[0]}
                alt={v.text}
                mx={3}
                borderRadius="lg"
              />

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button>Like</Button>

              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )
      }
    </>
  )
}

export default EmbedTweets
