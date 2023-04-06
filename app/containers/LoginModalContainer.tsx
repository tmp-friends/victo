import LoginModal from "../components/organisms/LoginModal"
import { useAuthContext } from "../contexts/AuthContext"
import { useGlobalSpinnerActionsContext } from "../contexts/GlobalSpinnerContext"

interface LoginModalContainerProps {
  /**
   * ログインしたときに呼ばれるイベントハンドラ
   */
  onLogin: (err?: Error) => void
}

/**
 * ログインモーダルコンテナ
 */
const LoginModalContainer = ({
  onLogin,
}: LoginModalContainerProps) => {
  const { login } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()

  // ログインボタンを押したとき
  const handleLogin = async () => {
    setGlobalSpinner(true)
    try {
      await login()
      onLogin && onLogin()
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message)
        onLogin && onLogin(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <LoginModal onLogin={handleLogin} />
}

export default LoginModalContainer
