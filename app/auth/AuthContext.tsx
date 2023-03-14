import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios from "axios"
import { Profile } from "../types/profile"

const defaultProfile: Profile = {
  name: "",
  email: "",
  image_url: "",
  is_user: true,
}

const AuthContext = createContext<Profile>(
)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export type AuthProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<Profile>()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/users/me",
          { withCredentials: true },
        )

        const profile = {
          name: res.data.name ?? "",
          email: res.data.email ?? "",
          image_url: res.data.profile_image_url ?? "",
          is_user: true,
        }

        setUser(
          profile
        )
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])


  return <AuthContext.Provider value={user}> {children} </AuthContext.Provider>
}
