import { createContext, useState } from "react";
import axios from "../components/api/axios";

const ReservationContext = createContext({
  reservations: [],
  totalReservations: 0,
  addReservation: (reservation, user) => {},
  isReserved: (bookId, email) => {},
  cancelReservation: (reservation, user) => {},
  setReservation: (reservationList) => {},
  getReservations: (user) => {},
});

export function ReservationContextProvider(props) {
  const [userReservations, setUserReservations] = useState([]);

  async function getReservations(user) {
    await axios.get(`/api/v1/reservation/user/${user}`).then(async (res) => {
      setUserReservations(await res.data);
      localStorage.setItem("reservations", JSON.stringify(await res.data));
    });
  }

  async function addReservationHandler(reservation, user) {
    await axios
      .post("/api/v1/reservation", reservation)
      .then(async (res) => {});
    await getReservations(user);
  }

  function setReservationHandler(reservationList) {
    setUserReservations(reservationList);
    console.log(userReservations);
  }

  function isReservedHandler(bookId, email) {
    return userReservations.some(
      (reservation) =>
        reservation.bookId === bookId && reservation.stallEmail === email
    );
  }

  async function cancelReservationHandler(reservation, user) {
    await axios
      .delete("/api/v1/reservation", { data: reservation })
      .then(async (res) => {
        console.log(await res.data);
      });
    await getReservations(user);
  }

  const context = {
    reservations: userReservations,
    totalReservations: userReservations.length,
    addReservation: addReservationHandler,
    isReserved: isReservedHandler,
    cancelReservation: cancelReservationHandler,
    setReservation: setReservationHandler,
    getReservations: getReservations,
  };

  return (
    <ReservationContext.Provider value={context}>
      {props.children}
    </ReservationContext.Provider>
  );
}

export default ReservationContext;
