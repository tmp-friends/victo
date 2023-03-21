import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Divider } from "@chakra-ui/react"

import { Tweets } from "../../components/tweets"
import { useTweetsSWR } from "../../hooks/swr/use-tweets-swr"
import { useHashtagSWR } from "../../hooks/swr/use-hashtag-swr"
import { VtuberProfile } from "../../components/vtuber-profile"
import { Vtuber } from "../../types/vtuber"


const HashtagsId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { hashtag } = useHashtagSWR(id)
  const { tweets, isLoading, isError } = useTweetsSWR([parseInt(id?.toString() ?? "0")])

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const vtuber: Vtuber = {
    id: hashtag?.id,
    name: hashtag?.name ?? "",
    email: hashtag?.email ?? "",
    image_url: hashtag?.profile_image_url ?? "",
  }

  return (
    <>
      {VtuberProfile(vtuber)}

      <Divider mb={8} />

      {Tweets(tweets)}
    </>
  )
}

export default HashtagsId
