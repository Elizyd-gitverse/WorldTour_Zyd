import Sidebar from "../../Component/Side Bar/Sidebar"
import style from "./MapPage.module.css"
import Map from "../../Component/Map/Map"
import User from "../../Component/User/User"

export default function MapPage() {
    return (
        <div className={style.mapPage}>
           <Sidebar />
           <Map />
           <User />
        </div>
    )
}