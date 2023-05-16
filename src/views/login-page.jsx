import { Button } from "@mui/material"
import { auth, provider } from "../services/firebase"
import { onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { login } from "../services/user.actions"
import { Link } from "react-router-dom"

function LoginPage({ setUser }) {

    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, )

    //   return () => {
    //     unsubscribe()
    //   }
    // }, [])

    async function signIn() {
        try {
            const res = await signInWithPopup(auth, provider)
            const user = res.user
            login(user)
            console.log('user:', user)
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className='login-page'>
            <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login-txt">
                    <h1>Sign in to WazApp</h1>
                </div>
                <Link to="rooms">
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage