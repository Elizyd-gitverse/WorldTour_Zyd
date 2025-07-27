import { useState } from "react"


export default function useGeoLocation() {
  const [geoPos, setGeoPos] = useState(null)
   
  function getPosition() {
    navigator.geolocation.getCurrentPosition(function(pos) {
    const lat = pos.coords.latitude
    const lng = pos.coords.longitude
    setGeoPos({lat, lng})

   }, function() {
    return alert('Your Location is Not Fetched')
   })
  }  

  return { getPosition, geoPos }
  
}