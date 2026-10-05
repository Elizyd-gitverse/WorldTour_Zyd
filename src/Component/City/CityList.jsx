import { CitiesContextUse } from "../../Context/CitiesContext"
import Message from "../../ui/Error/Message"
import Spinner from "../../ui/Spinner/Spinner"
import CityItem from "./CityItem"

import style from "./CityList.module.css"

import { useEffect } from "react"

export default function CityList() {
   const { citiesArr,  isLoading, isError, fetchCities } = CitiesContextUse()

   useEffect(function() {
      fetchCities()
   }, [])

    //the code order matters
    if(isLoading) return <Spinner />

    if(isError) return <Message message={isError}/>

    if(!citiesArr.length) return <Message message={'Start adding cities by clicking on Map 😉'}/>

    return (
        <ul className={style.cityList}>
          {citiesArr.map(cityObj => <CityItem key={cityObj._id} cityObj={cityObj}/>)}
        </ul>
    )
}