import AddStockRow from "./AddStockRow";

export default function AddStockTable(props) {
  return props.books.map((book) => (
    <AddStockRow
      key={book.id}
      id={book.id}
      name={book.bookName}
      author={book.author}
      publication={book.publication}
      price={book.price}
    />
  ));
}
