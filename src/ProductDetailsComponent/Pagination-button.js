import classes from "./pagination.module.css";
export default function PaginationButton({ container }) {
  function nextSlide() {
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft + width;
  }

  function prevSlide() {
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft - width;
  }
  return (
    <>
      <div className={classes.button_left}>
        <button onClick={prevSlide} className={classes.pagination_button_left}>
          <span>
            <i class="fa-solid fa-chevron-left"></i>
          </span>
        </button>
      </div>
      <div className={classes.button_right}>
        <button onClick={nextSlide} className={classes.pagination_button_right}>
          <span>
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        </button>
      </div>
    </>
  );
}
