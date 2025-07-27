
import { useNavigate } from "react-router-dom"
import style from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { CitiesContextUse } from "../Context/CitiesContext"
import { useEffect } from "react"
import useUrlLocation from "../hooks/useUrlLocation"
import useGeoLocation from "../hooks/useGeoLocation"
import Button from "./Button"


export default function Map() {
  const { citiesArr, mapPosition, dispatch } = CitiesContextUse()
  const [mapLat, mapLng] = useUrlLocation()
  const { getPosition, geoPos } = useGeoLocation()

//From USEPARAM 
  useEffect(function() {
    if(mapLat && mapLng) dispatch({type: "MapPosition", payload: [mapLat, mapLng]})
  }, [mapLat, mapLng, dispatch])

  
//FROM USE YOUR LOCATION
useEffect(function() {
   if(geoPos) dispatch({type: "GeoPosition", payload: [geoPos.lat, geoPos.lng]})
}, [geoPos, dispatch])

 
    return (
        <div className={style.mapContainer}>
          <Button type="position" onClick={getPosition}>Use Your Location</Button>
          <MapContainer className={style.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
           <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           {citiesArr.map(city => (
              <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                  {city.emoji} {city.cityName}
                </Popup>
              </Marker>
            ))}
            <MoveToMarker position={mapPosition}/>
            <MapClick />
          </MapContainer>
        </div>
    )
}

function MoveToMarker({position}) {
   const map = useMap()
   map.setView(position)
    return null;
}

function MapClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}