import React, { createContext, useContext, useState } from "react"

const GlobalSpinnerContext = createContext<boolean>(false)
const GlobalSpinnerActionsContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => { })

// グローバルスピナーの表示/非表示
export const useGlobalSpinnerContext = (): boolean =>
  useContext<boolean>(GlobalSpinnerContext)

// グローバルスピナーの表示/非表示のアクション
// useStateの更新関数はReact.Dispatch<React.SetStateAction<変化させる状態>>で表せる
export const useGlobalSpinnerActionsContext = (): React.Dispatch<
  React.SetStateAction<boolean>
> =>
  useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSpinnerActionsContext
  )

interface GlobalSpinnerProviderProps {
  children?: React.ReactNode
}

/**
 * グローバルスピナーコンテキストプロバイダー
 *
 * APIコール時に時間がかかるので、その時のローディング表示に用いる
 */
const GlobalSpinnerContextProvider = ({
  children,
}: GlobalSpinnerProviderProps) => {
  const [isGlobalSpinnerOn, setIsGlobalSpinnerOn] = useState(false)

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider value={setIsGlobalSpinnerOn}>
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
