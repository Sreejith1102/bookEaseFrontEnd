import { useContext, useState, useEffect, useRef } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import BookTable from "../components/book/BookTable";
import SearchBar from "../components/book/SearchBar";
import StallTable from "../components/user/StallTable";
import axios from "../components/api/axios";
import ReservationContext from "../store/reservation-context";

function UserHome() {
  const [currPageContext, setCurrentPageContext] = useState("book");
  const [bookResult, setBookResult] = useState([]);
  const [stallResult, setStallResult] = useState([]);
  const [book, setBook] = useState({});
  const user = JSON.parse(localStorage.getItem("login")).user;
  const reservationCtx = useContext(ReservationContext);
  const contextRef = useRef();

  useEffect(() => {
    async function getData() {
      await reservationCtx.getReservations(user);
    }
    getData();
  }, [user]);

  function toggleContext() {
    setCurrentPageContext(contextRef.current.value);
    setBook({});
  }

  async function searchBookHandler(data) {
    if (data) {
      await axios.get(`/api/v1/book/search/name/${data}`).then((res) => {
        setBookResult(res.data);
      });
    }
  }

  async function searchStallHandler(data) {
    if (data) {
      await axios.get(`/api/v1/stall/district/${data}`).then((res) => {
        setStallResult(res.data);
      });
    }
  }

  async function stallSelectHandler(district, bookId, name, author, price) {
    if (district) {
      const searchObject = {
        bookId: bookId,
        district: district,
      };
      await axios.post("/api/v1/stall/district", searchObject).then((res) => {
        setStallResult(res.data);
        setCurrentPageContext("stall");
        const bookData = {
          id: bookId,
          name: name,
          author: author,
          price: price,
        };
        setBook(bookData);
      });
    }
  }

  const searchBookElement = (
    <>
      <div className="d-flex flex-column align-items-center p-2 ">
        {bookResult.length !== 0 ? (
          <BookTable
            key={1}
            books={bookResult}
            onStallSelect={stallSelectHandler}
          />
        ) : (
          <p>Try Searching something</p>
        )}
      </div>
    </>
  );

  const searchStallElement = (
    <>
      <div className="d-flex flex-column align-items-center p-2">
        {stallResult.length !== 0 ? (
          <StallTable stalls={stallResult} bookId={book.id} />
        ) : (
          <p>No Stalls found on this district</p>
        )}
      </div>
    </>
  );

  return (
    <div>
      <MainNavigation current="home" />
      <div className="d-flex felx-column p-2 justify-content-center mt-2">
        <select
          className="form-control m-2 text-primary"
          style={{ width: "5rem" }}
          onChange={toggleContext}
          ref={contextRef}
        >
          <option value="book">Book</option>
          <option value="stall">Stall</option>
        </select>
        {currPageContext === "book" ? (
          <SearchBar onSearch={searchBookHandler} context={currPageContext} />
        ) : (
          <SearchBar onSearch={searchStallHandler} context={currPageContext} />
        )}
      </div>
      {currPageContext === "book" ? searchBookElement : searchStallElement}
    </div>
  );
}

export default UserHome;
