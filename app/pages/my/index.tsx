import type { NextPage } from "next"
import { useAuthContext } from "../../auth/AuthContext"
import { ProfileContent } from "../../components/profile-content";

const MyPage: NextPage = () => {
  const user = useAuthContext()

  return (
    <>
      {ProfileContent(user ?? { name: "", email: "", image_url: "", is_user: true })}
    </>
  )
};

export default MyPage
