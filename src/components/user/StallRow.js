import { useContext } from "react";
import ReservationContext from "../../store/reservation-context";

export default function StallRow(props) {
  const reservationCtx = useContext(ReservationContext);
  const user = JSON.parse(localStorage.getItem("login")).user;

  function toggleReserveHandler() {
    reservationCtx.isReserved(props.bookId, props.email)
      ? reservationCtx.cancelReservation(
          {
            bookId: props.bookId,
            stallEmail: props.email,
            userEmail: user,
          },
          user
        )
      : reservationCtx.addReservation(
          {
            bookId: props.bookId,
            stallEmail: props.email,
            userEmail: user,
          },
          user
        );
  }
  return (
    <div className="card flex-column p-3 w-50 mb-3">
      <span className="fw-bold">{props.name}</span>
      <p>
        Address : {props.address} <br />
        city: {props.city}
        <br />
        district : {props.district}
        <br />
        phone : {props.phone}
        <br />
      </p>
      <div>
        {props.bookId && (
          <button
            className="btn btn-outline-primary"
            onClick={toggleReserveHandler}
          >
            {reservationCtx.isReserved(props.bookId, props.email)
              ? "CANCEL RESERVATION"
              : "RESERVE"}
          </button>
        )}
      </div>
    </div>
  );
}
