import axios from "axios";
import { HOST } from "../utils/hostname";

export default axios.create({
  baseURL: HOST,
  headers: {
    "Access-Control-Allow-Origin": "https://flameyourskill.vercel.app",
  },
});
