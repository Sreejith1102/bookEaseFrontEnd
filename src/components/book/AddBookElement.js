import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

export default function AddBookElement() {
  const nameRef = useRef();
  const authorRef = useRef();
  const publicationRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const [savedBook, setSavedBook] = useState({});
  const [bookSaved, setBookSaved] = useState(false);
  const user = JSON.parse(localStorage.getItem("login")).user;
  const history = useHistory();

  async function saveHandler() {
    const book = {
      bookName: nameRef.current.value,
      author: authorRef.current.value,
      publication: publicationRef.current.value,
      price: parseInt(priceRef.current.value),
    };

    await axios.post("/api/v1/book/save-book", book).then(async (res) => {
      setSavedBook(await res.data);
      setBookSaved(true);
    });

    if (bookSaved) {
      const stock = {
        bookId: savedBook.id,
        email: user,
        amount: parseInt(stockRef.current.value),
      };

      axios.post("/api/v1/stock", stock).then((res) => {
        console.log(res.data);
        history.go("/stall-home");
      });
    }
  }

  return (
    <>
      <div className="card flex-column  w-25 mt-3 shadow">
        <div className="card-body">
          <h3 className="fw-bold">Add Book</h3>
          <label htmlFor="name">Name :</label>
          <input type="text" className="form-control mb-2" ref={nameRef} />
          <label htmlFor="author">Author :</label>
          <input type="text" className="form-control mb-2" ref={authorRef} />
          <label htmlFor="publication">Publication :</label>
          <input
            type="text"
            className="form-control mb-2"
            ref={publicationRef}
          />
          <label htmlFor="price">Price :</label>
          <input
            type="text"
            className="form-control w-25 mb-2"
            ref={priceRef}
          />
        </div>
        <div className="card-footer">
          <label htmlFor="price">Stock :</label>
          <input
            type="text"
            className="form-control w-25 mb-3"
            ref={stockRef}
          />
          <button
            className="btn mb-3 btn-outline-dark align-self-center "
            onClick={saveHandler}
          >
            SAVE
          </button>
        </div>
      </div>
    </>
  );
}
