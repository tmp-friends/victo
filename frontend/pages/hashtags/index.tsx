import type { NextPage } from "next";
import NextLink from "next/link"
import useSWR from "swr";
import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react";

import { Hashtags } from "../../types/hashtags";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const HashTags: NextPage = () => {
  // TODO: 100件ごと取得
  const { data, error } = useSWR("http://localhost:3001/hashtags?withVtuber=true", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      {
        data.map((v: Hashtags, i: number) => {
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
