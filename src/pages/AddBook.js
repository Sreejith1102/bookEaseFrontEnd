import AddBookElement from "../components/book/AddBookElement";
import StallNavigation from "../components/Layout/StallNavigation";

export default function AddBook() {
  return (
    <>
      <StallNavigation page="home" />
      <div className="d-flex flex-column align-items-center p-2 ">
        <AddBookElement />
      </div>
    </>
  );
}
