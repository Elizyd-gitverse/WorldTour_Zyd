// useReducer + Context API

import { createContext, useCallback, useContext, useReducer } from "react";


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

        case "DeleteCity": return {...state, citiesArr: state.citiesArr.filter(city => city._id !== action.payload)}

        case "Error": return {...state, isLoading: false, isError: action.payload}

        default: throw new Error("Unknown Action")
    }
}

// const BASE_URL = 'http://localhost:8000'
// const BASE_URL = 'https://citiesjson.onrender.com'
//2. take here
const BASE_URL = import.meta.env.VITE_API_URL
//2 Create Provider
function CitiesContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { isLoading, isError, citiesArr, currentCity, mapPosition } = state

    //1. GETTING DATA FROM API 
       async function fetchCities() {
          try{
            dispatch({type: "Loading"})
            const res = await fetch(`${BASE_URL}/api/v1/cities`, {
                credentials: "include", //mention in every fetch
            })

            const data = await res.json()
            if(data.status === 'fail') throw new Error(data.message)

            dispatch({type: "CityDataFetched", payload: data.data.cities})
          }catch(err) {
            dispatch({type:'Error', payload: err.message})
          }
       }


    //2. GETTING DATA FROM API BY USING ID OF ALREADY FETCHED DATA FROM API
   const fetchCityIdDetails = useCallback(async function fetchCityIdDetails(id) {
        try{
            dispatch({type: 'Loading'})
            const res = await fetch(`${BASE_URL}/api/v1/cities/${id}`, {
                credentials: "include"
            })

            const data = await res.json()
            if(data.status === 'fail') throw new Error(data.message)

            dispatch({type: 'CurrentCityDataFetched', payload: data.data.city})

        }catch(err) {
         dispatch({type:'Error', payload: err.message})
        }
    }, [])

    //3. SENDIG DATA TO API 
    async function SendCityData(newCity) {
        try{
         const res = await fetch(`${BASE_URL}/api/v1/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
         })
         const data = await res.json()
         if(data.status === 'fail') throw new Error(data.message)
         dispatch({type: "CityDataSent", payload: data.data.city})

        }catch(err) {
            dispatch({type:'Error', payload: err.message})
        }
    }

    //4. DELETING CITY FROM API by ID
    async function DeleteCity(id) {
        const res = await fetch(`${BASE_URL}/api/v1/cities/${id}`, {
            method: 'DELETE',
            credentials: "include"
          })

        if(!res.ok) {
           const data = await res.json()
           throw new Error(data.message)
        }  
        
          dispatch({type: "DeleteCity", payload: id})
    }


    return <CitiesContext.Provider 
       value={{
        isLoading,
        isError,
        citiesArr,
        currentCity,

        fetchCities,
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