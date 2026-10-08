// useReducer + Context API
import { createContext, useContext, useReducer } from "react";

//1 create Context api
const CitiesContext = createContext()

//useReducer
const initialState = {
    currentCity: {},
    mapPosition: [40, 0]
}

//reducer
function reducer(state, action) {
    switch(action.type) {
        case "currentCity": return {...state, currentCity: action.payload, isLoading: false}

        case "MapPosition": return {...state, mapPosition: action.payload}

        case "GeoPosition": return {...state, mapPosition: action.payload}

        default: throw new Error("Unknown Action")
    }
}

//2 Create Provider
function CitiesContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { currentCity, mapPosition } = state

    return <CitiesContext.Provider 
       value={{
        currentCity,
        mapPosition, 

        dispatch
       }}>{children}</CitiesContext.Provider>
}

//3. use Context
function CitiesContextUse() {
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("Context Use Before The Provider")
    return context
}

export { CitiesContextProvider, CitiesContextUse}