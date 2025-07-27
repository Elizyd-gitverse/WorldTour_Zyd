import { Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import Logo from "./Logo"
import style from "./Sidebar.module.css"
import Footer from "./Footer"

export default function Sidebar() {
    return (
        <div className={style.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <Footer />
        </div>
    )
}