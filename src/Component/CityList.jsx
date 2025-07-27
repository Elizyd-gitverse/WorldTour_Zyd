import { CitiesContextUse } from "../Context/CitiesContext"

import style from "./CityList.module.css"
import CityItem from "./CityItem"
import Spinner from "./Spinner"
import Message from "./Message"

export default function CityList() {
   const { citiesArr,  isLoading, isError } = CitiesContextUse()

    //the code order matters
    if(isLoading) return <Spinner />

    if(isError) return <Message message={isError}/>

    if(!citiesArr.length) return <Message message={'Start adding cities by clicking on Map 😉'}/>

    return (
        <ul className={style.cityList}>
          {citiesArr.map(cityObj => <CityItem key={cityObj.id} cityObj={cityObj}/>)}
        </ul>
    )
}