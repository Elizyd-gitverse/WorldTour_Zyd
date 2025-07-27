// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { CitiesContextUse } from "../Context/CitiesContext";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlLocation from "../hooks/useUrlLocation";
import Spinner from "./Spinner";
import Message from "./Message"
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";


function Form() {
  //can take lat & lng from useSearcParam or from CitiesContext API
  // const {mapPosition} = CitiesContextUse()
  // const [lat, lng] = mapPosition
  const {SendCityData} = CitiesContextUse()
  const [lat, lng] = useUrlLocation() 
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState('')



  useEffect(function() {
    const API_KEY = import.meta.env.VITE_BDC_API_KEY;
    async function fetchMapClickCity() {
       try{
         setIsLoading(true)
         setIsError("")
         const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${API_KEY}`)
         if(!res.ok) throw new Error("Error IP address is blocked!! 🚫")
         const data = await res.json()
         if(!data.city) throw new Error('That doesnt seem to be like a city, Please click some where else')
          console.log(data)
         setCityName(data.city || data.locality || "")
         setCountry(data.countryName)
         setEmoji(data.countryCode)
         setIsError("")
       }catch(err) {
          setIsError(err.message)
       }finally{
         setIsLoading(false)
       }
    }
    fetchMapClickCity()
  }, [lat, lng])


 async function handleSubmit(e) {
  e.preventDefault()
  if(!cityName && !date) return;
  const newCity = {cityName, country, date, notes, position: {lat: Number(lat), lng: Number(lng)}, emoji: '🍃'}
   await SendCityData(newCity)
   navigate('/map/city')
 }

  if(!lat && !lng) return  <Message message={"Start adding city by clicking on map"}/>

  if(isLoading) return <Spinner />

  if(isError) return <Message message={isError}/>
 

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
