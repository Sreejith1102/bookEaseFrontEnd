import { useContext, useEffect } from "react";
import CartItems from "../components/cart/CartItems";
import MainNavigation from "../components/Layout/MainNavigation";
import ReservationContext from "../store/reservation-context";

function Cart() {
  const reservationCtx = useContext(ReservationContext);
  const user = JSON.parse(localStorage.getItem("login")).user;

  useEffect(() => {
    reservationCtx.getReservations(user);
  }, []);

  return (
    <>
      <MainNavigation />
      <div className="d-flex flex-column align-items-center p-2 ">
        {reservationCtx.totalReservations === 0 ? (
          <>Reservations are empty</>
        ) : (
          reservationCtx.reservations.map((reservation) => (
            <CartItems key={reservation.bookId} reservation={reservation} />
          ))
        )}
      </div>
    </>
  );
}

export default Cart;
