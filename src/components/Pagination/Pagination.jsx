import css from "../Pagination/Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  function onPreviousClick() {
    if (currentPage === 1) {
      return;
    }
    currentPage -= 1;
    onPageChange(currentPage);
  }

  function onNextClick() {
    if (currentPage === totalPages) {
      return;
    }
    currentPage += 1;
    onPageChange(currentPage);
  }

  function onStartClick() {
    onPageChange(1);
  }

  function onEndClick() {
    onPageChange(totalPages);
  }

  return (
    <div className={`container ${css.paginationContainer}`}>
      <div className={css.buttons}>
        <button className={css.button} onClick={onStartClick}>
          &lt;&lt;
        </button>
        <button className={css.button} onClick={onPreviousClick}>
          &lt;
        </button>
      </div>
      <span>
        {currentPage} / {totalPages}
      </span>
      <div className={css.buttons}>
        <button className={css.button} onClick={onNextClick}>
          &gt;
        </button>
        <button className={css.button} onClick={onEndClick}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
