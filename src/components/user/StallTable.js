import StallRow from "./StallRow";

function StallTable(props) {
  return (
    <>
      {props.stalls.map((stall) => (
        <StallRow
          key={stall.email}
          name={stall.name}
          address={stall.address}
          city={stall.city}
          phone={stall.contact}
          district={stall.district}
          email={stall.email}
          bookId={props.bookId}
        />
      ))}
    </>
  );
}

export default StallTable;
