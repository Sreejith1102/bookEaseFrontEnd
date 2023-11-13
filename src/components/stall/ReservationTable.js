import ReservationRow from "./ReservationRow";

function ReservationTable(props) {
  return (
    <>
      {props.reservations.map((reservation) => (
        <ReservationRow
          key={reservation.bookId + reservation.userEmail}
          bookId={reservation.bookId}
          date={reservation.date}
          stallEmail={reservation.stallEmail}
          userEmail={reservation.userEmail}
        />
      ))}
    </>
  );
}

export default ReservationTable;
