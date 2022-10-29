import { getGenreById } from "../../config/genres"
import "./styles/item.scss"

export default function Item({ title = "", release_year = "", thumbnail = "", genres = [], isSpinner, ...restProps }) {
    /**
     * @todo implement favourite
     */

    if (isSpinner) {
        return (
            <div className="item" {...restProps}>
                <img src={"/assets/images/loading.gif"} alt="" />
            </div>
        )
    }

    return (
        <div className="item" {...restProps}>
            <a href="#fav">
                <i className="fa fa-crown"></i>
            </a>
            <img src={thumbnail} alt="" />
            <div className="info">
                <h4 className="title">{title}</h4>
                <p className="sub-text">{release_year}</p>
                <p className="sub-text">{getGenreById(genres)}</p>
            </div>
        </div>
    )
}
