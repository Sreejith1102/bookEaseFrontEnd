import { Link, useHistory } from "react-router-dom";

export default function StallNavigation(props) {
  const history = useHistory();

  function onLogoutHandler() {
    localStorage.removeItem("login");
    history.replace("/");
  }
  return (
    <nav className="navbar navbar-expand-lg border-bottom shadow-sm">
      <div className="container-fluid">
        <Link to="/stall-home" className="navbar-brand fs-3 text-dark fw-bold">
          BOOK-EASE
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarText">
        <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
        {props.page === "home" ? (
          <Link
            to="/stock-mgmt"
            className="btn border--subtle text-dark m-3 fw-bold"
          >
            STOCK
          </Link>
        ) : (
          <Link
            to="/stall-home"
            className="btn border--subtle text-dark m-3 fw-bold"
          >
            RESERVATIONS
          </Link>
        )}
        <button
          className="btn border--subtle text-dar m-3 fw-bold"
          onClick={onLogoutHandler}
          data-toggle="tooltip"
          data-placement="top"
          title="logout"
        >
          <img
            src={require("../../assets/images/logout.png")}
            alt="logout"
          ></img>
        </button>
      </div>
    </nav>
  );
}
