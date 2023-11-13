import { useRef } from "react";
import { districts } from "../../constants/constants";

function SearchBar({ onSearch, context }) {
  const searchDataRef = useRef();

  return (
    <>
      {context === "book" ? (
        <input
          type="text"
          className="form-control m-2"
          style={{ width: "25rem" }}
          ref={searchDataRef}
        ></input>
      ) : (
        <select
          ref={searchDataRef}
          className="form-control m-2"
          style={{ width: "25rem" }}
        >
          {districts.map((dis) => (
            <option key={dis} value={dis}>
              {dis}
            </option>
          ))}
        </select>
      )}
      <button
        className="btn btn-outline-primary m-2"
        onClick={() => {
          onSearch(searchDataRef.current.value);
        }}
      >
        search
      </button>
    </>
  );
}

export default SearchBar;
