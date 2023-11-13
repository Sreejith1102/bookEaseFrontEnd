import { useRef } from "react";

function BookRow(props) {
  const districtRef = useRef();

  return (
    <div className="card flex-column w-50 m-3">
      <div className="card-header">
        <span className="fw-bold">{props.bookName}</span>
      </div>
      <div className="card-body">
        Author : {props.author} <br />
        Publication: {props.publication}
        <br />
        Price : {props.price}
        <br />
      </div>
      <div className="card-footer flex-row ">
        <div className="d-flex flex-row justify-content-between">
          <select
            name="district"
            id="district"
            className="form-control mb-2 w-25"
            ref={districtRef}
          >
            <option value="Trivandrum">Trivandrum</option>
            <option value="Kollam">Kollam</option>
            <option value="Pathanamthitta">Pathanamthitta</option>
            <option value="Alappuzha">Alappuzha</option>
            <option value="Kottayam">Kottayam</option>
            <option value="Idukki">Idukki</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Thrissur">Thrissur</option>
            <option value="Palakkad">Palakkad</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Kozhikkod">Kozhikkod</option>
            <option value="Wayanad">Wayanad</option>
            <option value="Kannur">Kannur</option>
            <option value="Kasargod">Kasargod</option>
          </select>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              props.onStallSelect(
                districtRef.current.value,
                props.id,
                props.bookName,
                props.author,
                props.price
              );
            }}
          >
            check available stores
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookRow;
