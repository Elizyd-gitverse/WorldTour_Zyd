import style from "./CountryList.module.css"
import CountryItem from "./CountryItem"
import useCityFetchQuery from "../City/useCityFetchQuery"

export default function CountryList() {
    const { citiesArr } = useCityFetchQuery()

    const countryArr = citiesArr.reduce((acumArr ,city) => {
       if(acumArr.some(acum => acum.country === city.country)) return acumArr
       else return [...acumArr, { country: city.country, emoji: city.emoji, id: city._id } ]
    }, [])

    return (
            <ul className={style.countryList}>
                {countryArr.map(cityObj => <CountryItem key={cityObj.id} country={cityObj}/>)}
            </ul>
    )
}