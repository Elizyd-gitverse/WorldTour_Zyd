import style from "./Button.module.css"

export default function Button({children, type, onClick}) {
    return (
        <button className={` ${style.btn} ${style[type]}`} onClick={onClick}>{children}</button>
    )

}