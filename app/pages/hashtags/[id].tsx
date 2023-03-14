import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Divider } from "@chakra-ui/react"

import { Tweets } from "../../components/tweets"
import { useTweetsByHashtagIdSWR } from "../../hooks/swr/use-tweets-swr"
import { useHashtagSWR } from "../../hooks/swr/use-hashtag-swr"
import { ProfileContent } from "../../components/profile-content"
import { Profile } from "../../types/profile"


const HashtagsId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { hashtag } = useHashtagSWR(id)
  const { tweets, isLoading, isError } = useTweetsByHashtagIdSWR(id)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const profile: Profile = {
    name: hashtag?.name ?? "",
    email: hashtag?.email ?? "",
    image_url: hashtag?.profile_image_url ?? "",
    is_user: false,
  }

  return (
    <>
      {ProfileContent(profile)}

      <Divider mb={8} />

      {Tweets(tweets)}
    </>
  )
}

export default HashtagsId
