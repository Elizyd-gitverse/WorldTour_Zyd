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
//user info
const FAKE_USER = {
  name: "Siddharth",
  email: "sid@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

//2.Provide Context
function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user, isAuth} = state

    function login(email, password) {
        if(email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({type: "Login", payload: FAKE_USER})
        else alert("Wrong email and password :( Try again")
    }

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