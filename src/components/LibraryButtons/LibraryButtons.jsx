import { useNavigate } from "react-router-dom";
import css from "../LibraryButtons/LibraryButtons.module.css";

export default function LibraryButtons() {
  const navigate = useNavigate();
  return (
    <div className={css.buttons}>
      <button
        className={css.button}
        onClick={() => {
          navigate("/library/watched");
        }}
      >
        Watched
      </button>
      <button
        className={css.button}
        onClick={() => {
          navigate("/library/queued");
        }}
      >
        Queue
      </button>
    </div>
  );
}
