import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

export default function ReservationRow(props) {
  const [bookName, setBookName] = useState();
  const reservation = {
    bookId: props.bookId,
    stallEmail: props.stallEmail,
    userEmail: props.userEmail,
  };
  const history = useHistory();

  async function completeHandler() {
    await axios
      .delete("/api/v1/reservation/complete", { data: reservation })
      .then(async (res) => {
        console.log(await res.data);
        history.go(0);
      });
  }

  useEffect(() => {
    async function fetchBook(id) {
      axios.get(`/api/v1/book/${id}`).then(async (res) => {
        setBookName(await res.data.bookName);
      });
    }
    fetchBook(props.bookId);
  }, []);
  return (
    <div className="card flex-column p-3 w-50 mb-3">
      <span className="fw-bold fs-4">{bookName}</span>
      <span className="fw-bold">{props.userEmail}</span>
      <span className="fw-bold">{props.date}</span>
      <button
        className="btn btn-outline-dark w-25 mt-3"
        onClick={completeHandler}
      >
        COMPLETE
      </button>
    </div>
  );
}
