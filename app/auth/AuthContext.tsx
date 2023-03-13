import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios from "axios"

export type User = {
  name: string
  email: string
  profile_image_url: string
} | null

const AuthContext = createContext<Partial<User>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export type AuthProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/v1/users/me",
          { withCredentials: true },
        )

        setUser(
          {
            name: res.data.name,
            email: res.data.email,
            profile_image_url: res.data.profile_image_url,
          } as User
        )
      } catch (err) {
        setUser(null)
      }
    }
    getUser()
  }, [])


  return <AuthContext.Provider value={user}> {children} </AuthContext.Provider>
}
