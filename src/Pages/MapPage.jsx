import Sidebar from "../Component/Sidebar"
import style from "./MapPage.module.css"
import Map from "../Component/Map"
import User from "../Component/User"

export default function MapPage() {
    return (
        <div className={style.mapPage}>
           <Sidebar />
           <Map />
           <User />
        </div>
    )
}