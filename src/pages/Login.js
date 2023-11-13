import { useState } from "react";
import LoginCard from "../components/auth/LoginCard";
import SignupCard from "../components/auth/Signupcard";
import Card from "../components/ui/Card";
import AuthNavigation from "../components/Layout/AuthNavigation";

function Login() {
  const [isAUser, setIsAUser] = useState(true);

  const alreadyUserHandler = () => {
    setIsAUser(!isAUser);
  };

  return (
    <div>
      <div className="d-flex justify-content-center  mt-5">
        <AuthNavigation />
        <Card>
          {isAUser ? <LoginCard /> : <SignupCard />}
          <div className="card-footer">
            <span onClick={alreadyUserHandler} className="text-primary">
              {isAUser ? "Create Account" : "Already a user"}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
