import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

function LoginCard() {
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function loginHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    await axios
      .post("/api/auth/login", userData)
      .then((res) => {
        const role = res.data.role;
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: "true",
            token: res.data.accessToken,
            role: role,
            user: enteredEmail,
          })
        );
        console.log(res);
        if (role === "CUSTOMER") {
          history.push("/user-home");
        } else {
          history.push("/stall-home");
        }
      })
      .catch((error) => {
        const message = error.response.data.message;
        console.log(message);
        if (message === "Bad credentials") {
          setErrorMessage("Wrong Username or Password");
        }
      });
  }

  return (
    <div className="card-body">
      <form>
        <label htmlFor="username" className="mb-2">
          Email
        </label>
        <input
          className="form-control align-self-start mb-2"
          type="text"
          placeholder="email"
          ref={emailRef}
          id="username"
          required
        ></input>
        <label htmlFor="passsword" className="mb-2">
          Password
        </label>
        <input
          className="form-control align-self-start mb-2"
          type="password"
          placeholder="password"
          ref={passwordRef}
          id="password"
          required
        ></input>
        <button
          className="btn btn-outline-primary mt-2 mb-2"
          onClick={loginHandler}
        >
          Login
        </button>
      </form>
      <span className="text-danger mt-3">
        {errorMessage ? errorMessage : <></>}
      </span>
    </div>
  );
}

export default LoginCard;
