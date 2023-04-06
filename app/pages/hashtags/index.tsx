import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import NextLink from "next/link"
import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react"

import { Hashtag } from "../../types/hashtag"
import { ApiContext } from "../../types/data"
import getHashtags from "../../services/hashtags/get-hashtags"
import useHashtags from "../../services/hashtags/use-hashtags"

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_ROOT_URL ?? "",
}

type HashtagsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const HashtagsPage: NextPage<HashtagsPageProps> = ({
  hashtags: initialHashtags,
}: HashtagsPageProps) => {
  const hashtagsData = useHashtags(
    context,
    {
      initial: initialHashtags,
    },
  )

  const hashtags = hashtagsData.hashtags ?? initialHashtags

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

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL ?? "",
  }

  const hashtags = await getHashtags(context, { withVtuber: true })

  return {
    props: {
      hashtags: hashtags,
    }
  }
}

export default HashtagsPage
