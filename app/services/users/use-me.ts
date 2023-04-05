import { fetcher } from "./../fetcher"
import useSWR from "swr"

import { ApiContext, User } from "../../types/data"

export type UseMe = {
  /**
   * 取得したユーザ情報
   */
  user?: User
  /**
   * Loadingフラグ
   */
  isLoading: boolean
  /**
   * Errorフラグ
   */
  isError: boolean
  /**
   * Mutate
   */
  mutate: (
    data?: User | Promise<User>,
    shouldRevalidate?: boolean,
  ) => Promise<User | undefined>
}

/**
 * ユーザAPI(ログインユーザ取得)のカスタムフック
 * @param context APIコンテキスト
 * @returns ユーザとAPI呼び出しの状態
 */
const useMe = (
  context: ApiContext,
): UseMe => {
  const path = `${context.apiRootUrl}/v1/users/me`

  const { data, error, mutate } = useSWR<User>(path, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  }
}

export default useMe
