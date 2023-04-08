import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"
import { useRouter } from "next/router"
import { ApiContext, Hashtag } from "../../types/data"
import { Divider } from "@chakra-ui/react"

import VtuberProfile from "../../components/organisms/VtuberProfile"
import EmbedTweets from "../../components/organisms/EmbedTweets"
import useHashtag from "../../services/hashtags/use-hashtag"
import useTweets from "../../services/tweets/use-tweets"
import getHashtags from "../../services/hashtags/get-hashtags"
import getHashtag from "../../services/hashtags/get-hashtag"
import getTweets from "../../services/tweets/get-tweets"

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_ROOT_URL ?? "http://localhost:3001",
}

type HashtagPageProps = InferGetStaticPropsType<typeof getStaticProps>

const HashtagPage: NextPage<HashtagPageProps> = ({
  id,
  hashtag: initialHashtag,
  tweets: initialTweets,
}: HashtagPageProps) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const hashtagData = useHashtag(
    context,
    {
      id,
      withVtuber: true,
      initial: initialHashtag,
    }
  )

  const tweetsData = useTweets(
    context,
    {
      hashtagIds: [id],
      limit: 20,
      withMedia: true,
    },
  )

  const hashtag = hashtagData.hashtag ?? initialHashtag
  const tweets = tweetsData.tweets ?? initialTweets

  return (
    <>
      {VtuberProfile({
        id: hashtag.id,
        name: hashtag.name,
        imageUrl: hashtag.profile_image_url,
      })}

      <Divider mb={8} />

      {EmbedTweets({ tweets })}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL ?? "",
  }

  // ハッシュタグからパスを生成
  const hashtags = await getHashtags(context)
  const paths = hashtags.map((v: Hashtag) => {
    return `/hashtags/${v.id}`
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL ?? "",
  }

  if (!params) {
    throw new Error("params is undefined")
  }

  // ハッシュタグを取得し、静的ページを生成
  // paramsはstringで提供される
  const hashtagId = Number(params.id)
  const hashtag = await getHashtag(context, { id: hashtagId, withVtuber: true })
  const tweets = await getTweets(
    context,
    {
      hashtagIds: [hashtagId],
      limit: 20,
      withMedia: true,
    },
  )

  return {
    props: {
      id: hashtagId,
      hashtag,
      tweets,
    },
    // 弱整合性
    revalidate: 60,
  }
}

export default HashtagPage
