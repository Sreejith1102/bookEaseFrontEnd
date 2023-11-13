import { useRef } from "react";

export default function SearchUserBar(props) {
  const searchRef = useRef();

  return (
    <div className="d-flex mt-4">
      <input
        type="text"
        placeholder="search...."
        className="form-control m-2"
        style={{ width: "25rem" }}
        ref={searchRef}
        onChange={() => {
          props.searchHandler(searchRef.current.value);
        }}
      ></input>
      <button
        className="btn btn-outline-dark m-2"
        onClick={() => {
          props.searchHandler(searchRef.current.value);
        }}
      >
        search
      </button>
    </div>
  );
}
