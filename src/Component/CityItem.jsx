import { Link } from "react-router-dom"
import style from "./CityItem.module.css"
import { CitiesContextUse } from "../Context/CitiesContext"


//Formating date
function formatDate(date) {
    const option = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('en', option).format(new Date(date))
}

export default function CityItem({cityObj}) {
   const {currentCity, DeleteCity} = CitiesContextUse()

   function handleDeleteCity(e) {
     e.preventDefault()
     DeleteCity(cityObj.id)
   }

  return (
    <li>
       <Link className={`${style.cityItem} ${cityObj.id === currentCity.id && style["cityItem--active"]}`} to={`${cityObj.id}?lat=${cityObj.position.lat}&lng=${cityObj.position.lng}`}>
        <span className={style.emoji}>{cityObj.emoji}</span>
        <h3 className={style.name}>{cityObj.cityName}</h3>
        <time className={style.date}>{formatDate(cityObj.date)}</time>
        <button className={style.deleteBtn} onClick={handleDeleteCity}>&times;</button>
       </Link>
     </li>
  )
}