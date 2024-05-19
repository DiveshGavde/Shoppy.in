import classes from "./Login.module.css";
export default function Login() {
  return (
    <button className={classes.login_opn}>
      <div className={classes.login}>
        <i className={`fa-regular fa-user  ${classes.login_icon}`}></i>
        <div>
          <ul className={classes.login_info}>
            <li className={classes.signin}> Hello,sign in </li>
            <li className={classes.accounts_list}>Accounts & list</li>
          </ul>
        </div>
      </div>
    </button>
  );
}
