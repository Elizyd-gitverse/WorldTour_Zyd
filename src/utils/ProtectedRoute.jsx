import { useNavigate } from "react-router-dom";
import { AuthContextUse } from "../Context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({children}) {
    const {isAuth} = AuthContextUse()
    const navigate = useNavigate()

    useEffect(function() {
        if(!isAuth) navigate('/')   
    }, [isAuth, navigate])

    return isAuth ? children : null
}