import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

export default function AddStockRow(props) {
  const stockRef = useRef();
  const history = useHistory();

  function saveHandler() {
    const email = JSON.parse(localStorage.getItem("login")).user;
    const enteredStock = stockRef.current.value;

    const stock = {
      bookId: props.id,
      email: email,
      amount: parseInt(enteredStock),
    };

    axios.post("api/v1/stock", stock).then(async (res) => {
      history.go(0);
    });
  }

  return (
    <div className="card flex-column p-3 w-50 mb-3">
      <span className="fs-4 fw-bold">{props.name}</span>
      <span>Author: {props.author}</span>
      <span>Publication: {props.publication}</span>
      <span>Price : ${props.price}</span>
      <span>
        Stock :
        <div className="d-flex flex-row">
          <input type="text" className="form-control w-25 m-2" ref={stockRef} />
          <button className="btn btn-outline-dark m-2" onClick={saveHandler}>
            SAVE
          </button>
        </div>
      </span>
    </div>
  );
}
