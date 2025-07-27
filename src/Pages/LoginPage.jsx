import { useEffect, useState } from "react";
import PageNav from "../Component/PageNav";
import styles from "./Login.module.css"
import Button from "../Component/Button"
import { AuthContextUse } from "../Context/FakeAuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("sid@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate()

  const {login, isAuth} = AuthContextUse()

  function handleLogin(e) {
    e.preventDefault()
   if(email && password) login(email, password)
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