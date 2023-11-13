import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

export default function StockRow(props) {
  const [update, setUpdate] = useState(false);
  const stockRef = useRef();
  const history = useHistory();

  function toggleUpdate() {
    setUpdate(!update);
  }

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

  const updateElemet = (
    <div className="d-flex flex-row mt-2">
      <input type="text" className="form-control w-25 m-2" ref={stockRef} />
      <button className="btn btn-outline-dark m-2" onClick={saveHandler}>
        SAVE
      </button>
      <button className="btn btn-outline-dark m-2" onClick={toggleUpdate}>
        CANCEL
      </button>
    </div>
  );
  return (
    <div className="card flex-column p-3 w-50 mb-3">
      <span className="fw-bold fs-4">{props.name}</span>
      <span className="fw-bold">stock : {props.stock}</span>
      {update ? (
        updateElemet
      ) : (
        <button
          className="btn btn-outline-dark w-25 mt-2"
          onClick={toggleUpdate}
        >
          UPDATE
        </button>
      )}
    </div>
  );
}
