import { Link } from "react-router-dom";

import FilmIcon from "../../assets/film.svg";
import css from "../HeaderNav/HeaderNav.module.css";

export default function HeaderNav() {
  return (
    <nav className={css.navigation}>
      <div className={css.logoBox}>
        <Link to="/">
          <img src={FilmIcon} alt="Film Icon" width="20px" height="20px" />
        </Link>
        <Link to="/" className={css.logoText}>
          Moviego
        </Link>
      </div>
      <div className={css.pages}>
        <Link to="/" className={css.pagesText}>
          Home
        </Link>
        <Link to="/library/watched" className={css.pagesText}>
          Library
        </Link>
      </div>
    </nav>
  );
}
