import classes from "./Navbar.module.css";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchRef.current.value) {
      navigate("/");
    } else {
      navigate(`/search/${searchRef.current.value.replace(/\s/g, "_")}`);
    }
  };

  return (
    <header className={classes.header}>
      <div className={`container ${classes.container__nav}`}>
        <Link to="/">
          <h1 className={classes.logo}>VMDb</h1>
        </Link>
        <nav className={classes.nav}>
          <form onSubmit={handleSubmit}>
            <div className={classes.searchInputGroup}>
              <input type="text" ref={searchRef} className={classes.searchInput} placeholder="Search..." />
              <button className={classes.iconButton}>
                <BiSearch className={classes.icon} />
              </button>
            </div>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
