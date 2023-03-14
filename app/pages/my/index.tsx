import type { NextPage } from "next"
import { useAuthContext } from "../../auth/AuthContext"
import { ProfileContent } from "../../components/profile-content";
import { Profile } from "../../types/profile"

const MyPage: NextPage = () => {
  const user = useAuthContext()

  const profile: Profile = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    image_url: user?.profile_image_url ?? "",
    is_user: true,
  }

  return (
    <>
      {ProfileContent(profile)}
    </>
  )
};

export default MyPage
