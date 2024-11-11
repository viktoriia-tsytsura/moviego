import css from "../ErrorMessage/ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <p className={css.errorText}>
      Sorry, we couldn't find any matches for your search :(
      <br /> Double-check the title or explore what is trending now!
    </p>
  );
}
