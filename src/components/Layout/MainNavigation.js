import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ReservationContext from "../../store/reservation-context";

export default function MainNavigation(props) {
  const history = useHistory();
  const reservationCtx = useContext(ReservationContext);

  function onClickHandler() {
    localStorage.removeItem("login");
    history.replace("/");
  }

  return (
    <nav className="navbar navbar-expand-lg border-bottom shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fs-3 text-dark fw-bold">BOOK-EASE</span>
        <div className="collapse navbar-collapse" id="navbarText">
          <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
          {props.current !== "home" ? (
            <Link
              className="btn border--subtle text-dark m-3 fw-bold"
              to={"user-home"}
            >
              HOME
            </Link>
          ) : (
            <>
              <Link
                className="btn border--subtle text-dar fw-bold"
                to={`/cart`}
              >
                <img
                  src={require("../../assets/images/cart.png")}
                  alt="cart"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="cart"
                ></img>
              </Link>
              <span className="badge bg-secondary">
                {reservationCtx.totalReservations}
              </span>
            </>
          )}
          <button
            className="btn border--subtle text-dar m-3 fw-bold"
            onClick={onClickHandler}
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
      </div>
    </nav>
  );
}
