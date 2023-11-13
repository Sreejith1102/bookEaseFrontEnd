import { useState } from "react";
import StallSignUp from "./StallSignup";
import UserSignup from "./UserSignup";

export default function SignupCard() {
  const [user, setuser] = useState(true);

  function roleToggleHandler() {
    setuser(!user);
  }

  return (
    <>
      <div className="card-header ">
        <div className="fw-bold fs-4"> {user ? "USER" : "BOOK STALL"} </div>
        <div className="fs-7 text-primary" onClick={roleToggleHandler}>
          got to {user ? "Book Stall Signup" : "User Signup"}
        </div>
      </div>
      <div className="card-body">{user ? <UserSignup /> : <StallSignUp />}</div>
    </>
  );
}
