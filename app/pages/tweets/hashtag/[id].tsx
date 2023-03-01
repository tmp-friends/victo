import type { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"

import { Tweets } from "../../../components/tweets"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const TweetsHashtagId: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`http://localhost:3001/tweets/hashtag/${id}?props=tweet_id&limit=10`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      {Tweets(data)}
    </>
  )
}

export default TweetsHashtagId
