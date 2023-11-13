import StockRow from "./StockRow";

export default function StockTable({ stocks }) {
  return (
    <>
      {stocks.map((stock) => (
        <StockRow
          key={stock.bookId}
          id={stock.bookId}
          name={stock.bookName}
          stock={stock.stock}
        />
      ))}
    </>
  );
}
