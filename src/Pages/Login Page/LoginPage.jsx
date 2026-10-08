import { useEffect, useState } from "react";
import PageNav from "../../ui/Page Nav/PageNav";
import styles from "./Login.module.css"
import Button from "../../ui/Button/Button"
import { AuthContextUse } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import useLoginApi from "../../Component/User/useUserApi";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {isAuth} = AuthContextUse()
  const {login} = useLoginApi(email, password)
 
  function handleLogin(e) {
    e.preventDefault()
   if(email && password) login(email, password) //mutate = login
  }

  useEffect(function() {
     if(isAuth) navigate("/map", {replace: true})
  }, [isAuth, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}