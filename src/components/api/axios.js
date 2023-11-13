import axios from "axios";
import { WebApiUrl } from "../../constants/constants";

const login = JSON.parse(localStorage.getItem("login"));
const token = login ? login.token : "";
export default axios.create({
  baseURL: WebApiUrl,
  headers: token.token,
});
