import { useEffect, useState } from "react";
import axios from "../components/api/axios";
import StallNavigation from "../components/Layout/StallNavigation";
import SearchUserBar from "../components/stall/SearchUserBar";
import AddStockTable from "../components/stock/AddStockTable";
import StockTable from "../components/stock/StockTable";
import { Link } from "react-router-dom";

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [filterstock, setFilterStock] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [addStock, setAddStock] = useState(false);
  const [books, setBooks] = useState([]);

  const user = JSON.parse(localStorage.getItem("login")).user;

  useEffect(() => {
    async function fetchStock(user) {
      await axios.get(`/api/v1/stock/${user}`).then(async (res) => {
        await res.data.forEach(async (tempStock) => {
          await axios
            .get(`/api/v1/book/${tempStock.bookId}`)
            .then(async (book) => {
              const newStock = {
                bookId: tempStock.bookId,
                bookName: book.data.bookName,
                stock: tempStock.stock,
              };
              setStock((prevStock) => [...prevStock, newStock]);
              setFilterStock((prevFilterStock) => [
                ...prevFilterStock,
                newStock,
              ]);
            });
        });
        setIsMounted(true);
      });
    }
    fetchStock(user);
  }, [user]);

  async function onSearchHandler(data) {
    const temp = stock.filter((res) =>
      res.bookName.toLowerCase().includes(data.toLowerCase())
    );
    setFilterStock(temp);
  }

  async function onAddSearchHandler(data) {
    console.log(data);
    if (data !== "") {
      axios.get(`api/v1/book/search/name/${data}`).then(async (res) => {
        setBooks(await res.data);
      });
    }
  }

  function toggleAddStock() {
    setAddStock(!addStock);
  }

  const searchStockElement = (
    <>
      <div className="d-flex p-2 justify-content-center">
        <SearchUserBar searchHandler={onSearchHandler} />
      </div>
      <div className="d-flex flex-column align-items-center p-2 ">
        <button
          className="btn text-primary fw-bold fs-6 mb-2"
          onClick={toggleAddStock}
        >
          + Add A New Stock?
        </button>
        {filterstock.length !== 0 ? <StockTable stocks={filterstock} /> : <></>}
      </div>
    </>
  );

  const addStockElement = (
    <>
      <div className="d-flex flex-row p-2 justify-content-center">
        <SearchUserBar searchHandler={onAddSearchHandler} />
      </div>
      <div className="d-flex flex-column align-items-center p-2 ">
        <Link to="/add-book" className="btn text-primary mb-3">
          Can't find the book?
        </Link>
        <AddStockTable books={books} stock={stock} />
      </div>
    </>
  );

  const stockElement = addStock ? addStockElement : searchStockElement;

  return (
    <>
      <StallNavigation />
      {isMounted ? (
        stockElement
      ) : (
        <div className="d-flex flex-column align-items-center p-2 ">
          Loading
        </div>
      )}
    </>
  );
}
