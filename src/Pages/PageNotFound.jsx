import { Link } from "react-router-dom";
import style from "./PageNotFound.module.css"

export default function PageNotFound() {
    return (
        <div className={style.notFound}>
        <p>PAGE NOT FOUND :(</p>
        <Link to="/">Go Back to Home Page 🚀</Link>
        </div>
    )
}