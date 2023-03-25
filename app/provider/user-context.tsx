import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios from "axios"
import { User } from "../types/user"

// contextの作成
const UserContext = createContext<User | null>(null)

// 子要素で使うためのhooks
export const useUserContext = () => {
  return useContext(UserContext)
}

export type UserProps = {
  children: ReactNode
}

// _app.tsxで状態管理に使用するProviderの作成
export const UserProvider = ({ children }: UserProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        // ユーザ情報を取得
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/me`,
          { withCredentials: true },
        )

        const userInfo: User = {
          id: res.data.id,
          name: res.data.name ?? "",
          email: res.data.email ?? "",
          image_url: res.data.profile_image_url ?? "",
          following_hashtags: [],
        }

        // ユーザがフォロー中のHashtagを取得
        const hashtags: number[] = []
        const resFollowingHashtags = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/${res?.data.id}/following_hashtags`,
          { withCredentials: true }
        )

        resFollowingHashtags?.data.forEach((v: any) => {
          hashtags.push(v.hashtag_id)
        })
        userInfo.following_hashtags = hashtags

        // userの更新
        setUser(userInfo)
      } catch (err) {
        console.log(err)
      }
    }

    getUser()
  }, [])

  // BUG: 未ログインだと表示されなくなる
  if (!user) return <div>loading...</div>

  return <UserContext.Provider value={user}> {children} </UserContext.Provider>
}
