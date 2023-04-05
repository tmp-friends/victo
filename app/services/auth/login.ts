import { getAuth, getIdToken, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from "axios"

import { app } from "../../firebase"
import { ApiContext } from "./../../types/data.d"

const login = async (context: ApiContext): Promise<void> => {
  // firebase authenticationの初期化
  const auth = getAuth(app)
  // GoogleProviderの生成
  const provider = new GoogleAuthProvider()

  try {
    // FirebaseAuthでの認証
    const result = await signInWithPopup(auth, provider)
    const idToken = await getIdToken(result.user, true)

    // APIリクエスト
    await axios.post(`${context.apiRootUrl}/v1/users/login`,
      { idToken },
      { withCredentials: true },
    )
  } catch (err) {
    console.error(err)
  }
}

export default login
