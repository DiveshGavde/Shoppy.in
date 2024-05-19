import classes from "./searchinput.module.css";
import { Form, redirect } from "react-router-dom";

export default function SearchInput() {
  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className={classes.search_option}>
      {/* <select className={classes.category_opt}>
        <option className={classes.option} value="">
          All
        </option>
        <option className={classes.option} value="phone">
          Phone
        </option>
        <option className={classes.option} value="watch">
          watch
        </option>
        <option className={classes.option} vlaue="tv">
          Tv
        </option>
        <option className={classes.option} vlaue="books">
          Books
        </option>
        <option className={classes.option} vlaue="beauty">
          Beauty
        </option>
        <option className={classes.option} vlaue="furniture">
          Furniture
        </option>
      </select> */}
      <Form
        method="post"
        action="/searchresults"
        className={classes.search_panel}
      >
        <input
          required
          name="value"
          className={classes.search_bar}
          placeholder="Search any product here"
        />
        <button className={classes.search_button}>
          <i
            className={`fa-solid fa-magnifying-glass ${classes.search_icon}`}
          ></i>
        </button>
      </Form>
    </div>
  );
}
