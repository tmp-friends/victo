import { getAuth, getIdToken, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { app } from '../firebase';
import axios from 'axios';

export const login = async () => {
  // firebase authenticationの初期化
  const auth = getAuth(app)
  // GoogleProviderの生成
  const provider = new GoogleAuthProvider()

  try {
    // 認証
    const result = await signInWithPopup(auth, provider)

    const idToken = await getIdToken(result.user, true)

    await postLogin(idToken)

  } catch (err) {
    console.error(err)
  }
}

export const postLogin = (idToken: string) => {
  axios.post("http://localhost:3001/v1/users/login",
    { idToken },
    { withCredentials: true },
  )
}
