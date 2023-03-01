import type { NextPage } from "next"
import NextLink from "next/link"
import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react"

import { useHashtagsSWR } from "../../hooks/swr/use-hashtags-swr"
import { Hashtag } from "../../types/hashtag"

const HashTags: NextPage = () => {
  // TODO: 100件ごと取得
  const { hashtags, isLoading, isError } = useHashtagsSWR()

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      {
        hashtags.map((v: Hashtag, i: number) => {
          return (
            <Box key={i} as={NextLink} href={`/hashtags/${v.id}`}>
              <Tag size="lg" borderRadius="full" mr={1} mb={2}>
                <Avatar
                  src={v.profile_image_url}
                  size="xs"
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

export default HashTags
