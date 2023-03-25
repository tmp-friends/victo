import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useUserContext } from "../../provider/user-context"
import { UserProfile } from "../../components/user-profile"

const MyPage: NextPage = () => {
  const user = useUserContext()
  const isLogin = !!user
  const router = useRouter()

  return (
    <>
      {isLogin ? UserProfile(user) : router.push("/login")}
    </>
  )
};

export default MyPage
