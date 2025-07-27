// useReducer + Context API

import { createContext, useContext, useEffect, useReducer } from "react";


//1 create Context api
const CitiesContext = createContext()



//useReducer
const initialState = {
    citiesArr: [],
    isLoading: false,
    isError: "",
    currentCity: {},
    mapPosition: [40, 0]
}

function reducer(state, action) {
    switch(action.type) {

        case "Loading" : return {...state, isLoading: true}

        case 'CityDataFetched': return {...state, citiesArr: action.payload, isLoading: false}

        case "CurrentCityDataFetched": return {...state, currentCity: action.payload, isLoading: false}

        case "MapPosition": return {...state, mapPosition: action.payload}

        case "GeoPosition": return {...state, mapPosition: action.payload}

        case "CityDataSent": return {...state, citiesArr: [...state.citiesArr, action.payload]}

        case "DeleteCity": return {...state, citiesArr: state.citiesArr.filter(city => city.id !== action.payload)}

        case "Error": return {...state, isLoading: false, isError: action.payload}

        default: throw new Error("Unknown Action")
    }
}

// const BASE_URL = 'http://localhost:8000'
const BASE_URL = 'https://citiesjson.onrender.com'

//2 Create Provider
function CitiesContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { isLoading, isError, citiesArr, currentCity, mapPosition } = state

    //1. GETTING DATA FROM API 
    useEffect(function() {
       async function fetchCities() {
          try{
            dispatch({type: "Loading"})
            const res = await fetch(`${BASE_URL}/cities`)
            if(!res.ok) throw new Error("City Data Not Fetched 🚫")
            const data = await res.json()
            dispatch({type: "CityDataFetched", payload: data})

          }catch(err) {
            console.log(err.message)
            dispatch({type:'Error', payload: err.message})
          }
       }
       fetchCities()
    }, [])

    //2. GETTING DATA FROM API BY USING ID OF ALREADY FETCHED DATA FROM API
    async function fetchCityIdDetails(id) {
        try{
            dispatch({type: 'Loading'})
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            if(!res.ok) throw new Error("Current City Data Not Fetched 🚫")
            const data = await res.json()
            dispatch({type: 'CurrentCityDataFetched', payload: data})

        }catch(err) {
         console.log(err.message)
         dispatch({type:'Error', payload: err.message})
        }
    }

    //3. SENDIG DATA TO API 
    async function SendCityData(newCity) {
        try{
         const res = await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json"
            }
         })
          if(!res.ok) throw new Error("Current City Data Could not be Marked 🚫")
         const data = await res.json()
         dispatch({type: "CityDataSent", payload: data})

        }catch(err) {
            console.log(err.message)
            dispatch({type:'Error', payload: err.message})
        }
    }

    //4. DELETING CITY FROM API by ID
    async function DeleteCity(id) {
        console.log(id)
         await fetch(`${BASE_URL}/cities/${id}`, {
            method: 'DELETE'
          })

         dispatch({type: "DeleteCity", payload: id})
    }


    return <CitiesContext.Provider 
       value={{
        isLoading,
        isError,
        citiesArr,
        currentCity,
        fetchCityIdDetails,
        mapPosition, 
        SendCityData,
        DeleteCity,

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