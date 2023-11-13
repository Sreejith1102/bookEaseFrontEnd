import { useState, useEffect } from "react";
import axios from "../components/api/axios";
import StallNavigation from "../components/Layout/StallNavigation";
import SearchUserBar from "../components/stall/SearchUserBar";
import ReservationTable from "../components/stall/ReservationTable";

function StallHome() {
  const [reservations, setRservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const user = JSON.parse(localStorage.getItem("login")).user;

  useEffect(() => {
    async function fetchData() {
      await axios.get(`api/v1/reservation/stall/${user}`).then(async (res) => {
        setRservations(await res.data);
        setFilteredReservations(await res.data);
      });
    }
    fetchData();
  }, []);

  function onSearch(data) {
    const temp = reservations.filter((res) => res.userEmail.includes(data));
    setFilteredReservations(temp);
  }
  return (
    <>
      <StallNavigation page="home" />
      <div className="d-flex p-2 justify-content-center">
        <SearchUserBar searchHandler={onSearch} searchFor="user" />
      </div>
      <div className="d-flex flex-column align-items-center p-2 ">
        {filteredReservations.length ? (
          <ReservationTable reservations={filteredReservations} />
        ) : (
          <p>No Reservation Found</p>
        )}
      </div>
    </>
  );
}

export default StallHome;
