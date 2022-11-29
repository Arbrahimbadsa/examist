import axios from "axios";
import { HOST } from "../utils/hostname";

export default axios.create({
  baseURL: HOST,
});
