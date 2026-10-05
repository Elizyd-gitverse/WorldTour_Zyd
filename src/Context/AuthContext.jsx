import { createContext, useContext, useReducer } from "react";

//1. Create Context
const AuthContext = createContext()

//USEREDUCER

const initialState = {
    user: {},
    isAuth: false
}

function reducer(state, action) {
    switch(action.type) {
        case "Login": return {...state, user: action.payload, isAuth: true}

        case 'Logout': return {...initialState}

        default: throw new Error('Action Unknown')
    }
}

//2.Provide Context
const BASE_URL = import.meta.env.VITE_API_URL
function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user, isAuth} = state

    //login from Backend Added
    async function login(email, password) {
        try{
            const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
                method: 'POST',
                body: JSON.stringify({email, password}),
                credentials: "include", //mention in auth
                headers: {
                    'Content-Type': "application/json"
                }
            })

            const data = await res.json()

            if(data.status === 'fail') throw new Error(data.message)

            dispatch({type: "Login", payload: {...data.data.user, avatar: "/iconzydd.webp"}})
        }catch(err) {
             alert(err.message)
        }
    }

    //logout
    function logout() {
       dispatch({type: "Logout"})
    }


    return <AuthContext.Provider 
      value={{
          user,
          isAuth,
          login,
          logout
    }}>{children}</AuthContext.Provider>
}

function AuthContextUse() {
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('Auth Context beig used outside of Provider')
    return context    
}

export {AuthContextProvider, AuthContextUse}