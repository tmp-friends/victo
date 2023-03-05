import type { NextPage } from "next"
import { useRouter } from "next/router"

import { Tweets } from "../../../components/tweets"
import { useTweetsByHashtagIdSWR } from "../../../hooks/swr/use-tweets-swr"


const TweetsHashtagId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { tweets, isLoading, isError } = useTweetsByHashtagIdSWR(id)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      {Tweets(tweets)}
    </>
  )
}

export default TweetsHashtagId