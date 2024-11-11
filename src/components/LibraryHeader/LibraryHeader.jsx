import HeaderNav from "../HeaderNav/HeaderNav";
import LibraryButtons from "../LibraryButtons/LibraryButtons";
import css from "../LibraryHeader/LibraryHeader.module.css";

export default function LibraryHeader() {
  return (
    <header className={`container ${css.header}`}>
      <HeaderNav />
      <LibraryButtons />
    </header>
  );
}
