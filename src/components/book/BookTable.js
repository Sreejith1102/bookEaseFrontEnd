import BookRow from "./BookRow";

function BookTable(props) {
  return (
    <>
      {props.books.map((book) => (
        <BookRow
          id={book.id}
          key={book.id}
          bookName={book.bookName}
          author={book.author}
          publication={book.publication}
          price={book.price}
          onStallSelect={props.onStallSelect}
        />
      ))}
    </>
  );
}

export default BookTable;
