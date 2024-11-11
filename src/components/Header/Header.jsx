import css from "./Header.module.css";

import Searchbar from "../Searchbar/Searchbar";
import HeaderNav from "../HeaderNav/HeaderNav";

export default function Header() {
  return (
    <header className={`container ${css.header}`}>
      <HeaderNav />
      <Searchbar />
    </header>
  );
}
