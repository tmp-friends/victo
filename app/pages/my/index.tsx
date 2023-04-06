import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useAuthContext } from "../../contexts/AuthContext"
import UserProfile from "../../components/organisms/UserProfile"

const MyPage: NextPage = () => {
  const { authUser } = useAuthContext()
  const isLogin = authUser && authUser.id !== undefined

  // TODO: authguard

  return (
    <>
      {
        isLogin
          ? UserProfile({
            id: authUser.id,
            name: authUser.name,
            imageUrl: authUser.profile_image_url,
            email: authUser.email,
          })
          // TODO: フォロー中のタグを表示する
          : <></>
      }
    </>
  )
};

export default MyPage
