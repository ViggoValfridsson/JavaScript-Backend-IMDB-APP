import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";
import { TfiFaceSad } from "react-icons/tfi";

const PageNotFound = () => {
  return (
    <section>
      <div className={`container ${classes.notFoundContainer}`}>
        <div className={classes.iconContainer}>
          <TfiFaceSad className={classes.icon} />
        </div>
        <h1>404</h1>
        <h2>We could not find the page</h2>
        <Link to="/">Go to the homepage</Link>
      </div>
    </section>
  );
};

export default PageNotFound;
