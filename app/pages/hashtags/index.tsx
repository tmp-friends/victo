import type { NextPage } from "next"
import NextLink from "next/link"
import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react"

import { useHashtagsSWR } from "../../hooks/swr/use-hashtags-swr"
import { Hashtag } from "../../types/hashtag"

const Hashtags: NextPage = () => {
  const { hashtags, isLoading, isError } = useHashtagsSWR()

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      {
        hashtags.map((v: Hashtag, i: number) => {
          return (
            <Box key={i} as={NextLink} href={`/hashtags/${v.id}`}>
              <Tag size="lg" borderRadius="full" boxShadow="lg" mr={4} mb={6}>
                <Avatar
                  src={v.profile_image_url}
                  size="md"
                  name={v.vtuber_name}
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{v.name}</TagLabel>
              </Tag>
            </Box>
          )
        })
      }
    </>
  )
}

export default Hashtags
