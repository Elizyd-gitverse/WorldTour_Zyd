import { createContext, useContext, useReducer } from "react";

//1. Create Context
const AuthContext = createContext()

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

function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {user, isAuth} = state

    //logout
    function logout() {
       dispatch({type: "Logout"})
    }

    return <AuthContext.Provider 
      value={{
          user,
          isAuth,
          logout,
          dispatch
    }}>{children}</AuthContext.Provider>
}

function AuthContextUse() {
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('Auth Context being used outside of Provider')
    return context    
}

export {AuthContextProvider, AuthContextUse}