import { createContext, useContext } from "react"

import login from "../../services/auth/login"
import useMe from "../../services/users/use-me"
import { User, ApiContext } from "../../types/data"

type AuthContextType = {
  authUser?: User
  isLoading: boolean
  login: () => Promise<void>
  // logout: () => Promise<void>
  mutate: (
    data?: User | Promise<User>,
    shouldRevalidate?: boolean,
  ) => Promise<User | undefined>
}

type AuthContextProviderProps = {
  context: ApiContext,
  authUser?: User,
}

const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  login: async () => Promise.resolve(),
  // logout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
})

export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext)
}

/**
 * 認証コンテキストプロバイダー
 * login・logoutが成功した際にmutateで/v1/users/meを呼び出す
 *
 * @param params パラメータ
 */
export const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  const { user, isLoading, mutate } = useMe(context)

  // ログイン
  const loginInternal = async () => {
    await login(context)
    await mutate()
  }

  // TODO
  // // ログアウト
  // const logoutInternal = async () => {
  //   await logout()
  //   await mutate()
  // }

  return (
    <AuthContext.Provider
      value={{
        authUser: user ?? authUser,
        isLoading,
        login: loginInternal,
        // logout: logoutInternal,
        mutate,
      }}
    >{children}</AuthContext.Provider>
  )
}
