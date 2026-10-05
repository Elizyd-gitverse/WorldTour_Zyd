import style from "../Component/Side Bar/Sidebar.module.css"

export default function Footer() {
    return ( 
    <div className={style.footer}>
      <footer className={style.copyright}>&copy; Copyright {new Date().getFullYear()} by worldZyd Inc. </footer>
    </div>
    )
}