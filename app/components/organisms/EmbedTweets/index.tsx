import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Icon, Img, Link, SimpleGrid, Spacer, Text, textDecoration } from "@chakra-ui/react"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"

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
      {tweetsChunks === undefined || tweetsChunks.length === 0 ? (
        <Text fontWeight="semibold" align="center">
          Tweets not found
        </Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} alignItems="flex-start" spacingX={4} spacingY={8}>
            {tweetsChunks.map((tweets) => (
              Array.isArray(tweets) && tweets.map((v, i) => (
                <Card
                  key={i}
                  size="sm"
                  variant="elevated"
                  onClick={() => handleCardClick(v.url)}
                >
                  {/* <Link href={v.url} isExternal> */}

                  <CardHeader>
                    <Flex alignItems="center">
                      <Flex>
                        <Avatar name="test" src="https://bit.ly/sage-adebayo" />
                        <Box>
                          <Heading size="sm">{"Author Nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee".substring(0, 10)}</Heading>
                          <Text>Author UID</Text>
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
                    <Text _hover={{ textDecoration: "none" }}>{v.text}</Text>
                  </CardBody>

                  <Img
                    src={v.media_url}
                    alt={v.text}
                    mx="auto"
                    maxH="400px"
                    borderRadius="lg"
                    loading="lazy"
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

                  {/* </Link> */}

                </Card>
              ))
            ))}
          </SimpleGrid>
        </>
      )
      }
    </>
  )
}

export default EmbedTweets
