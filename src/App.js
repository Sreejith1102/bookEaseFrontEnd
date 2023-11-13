import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StallHome from "./pages/StallHome";
import UserHome from "./pages/UserHome";
import Stock from "./pages/Stock";
import Cart from "./pages/Cart";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/stall-home" exact>
        <StallHome />
      </Route>
      <Route path="/user-home" exact>
        <UserHome />
      </Route>
      <Route path="/stock-mgmt" exact>
        <Stock />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/add-book" exact>
        <AddBook />
      </Route>
    </Switch>
  );
}

export default App;
