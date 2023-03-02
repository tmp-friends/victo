import type { NextPage } from "next"
import { useRouter } from "next/router"

import { Tweets } from "../../components/tweets"
import { useTweetsByHashtagIdSWR } from "../../hooks/swr/use-tweets-swr"
import { useHashtagSWR } from "../../hooks/swr/use-hashtag-swr"
import { Avatar, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react"


const HashtagsId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { hashtag } = useHashtagSWR(id)
  const { tweets, isLoading, isError } = useTweetsByHashtagIdSWR(id)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      <Flex alignItems="center" mt={4} mb={8}>
        <Avatar
          src={hashtag.profile_image_url}
          size="lg"
          name={hashtag.name}
          mr={3}
        />
        <Heading as="h1" size="md">
          {hashtag.name}
        </Heading>
        <Button size="lg" colorScheme="gray" ml={10}>Follow</Button>
      </Flex>
      <Divider mb={8} />
      {Tweets(tweets)}
    </>
  )
}

export default HashtagsId
