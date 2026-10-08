
import Message from "../../ui/Error/Message"
import Spinner from "../../ui/Spinner/Spinner"
import CityItem from "./CityItem"

import style from "./CityList.module.css"
import useCityFetchQuery from "./useCityFetchQuery"


export default function CityList() {
    const {citiesArr, isFetching, error} = useCityFetchQuery()

    if(isFetching) return <Spinner />
    if(error) return <Message message={error.message}/>

    if(!citiesArr.length) return <Message message={'Start adding cities by clicking on Map 😉'}/>

    return (
        <ul className={style.cityList}>
          {citiesArr.map(cityObj => <CityItem key={cityObj._id} cityObj={cityObj}/>)}
        </ul>
    )
}