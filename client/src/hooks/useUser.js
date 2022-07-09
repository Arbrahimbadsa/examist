import { useSelector } from "react-redux";
export default function useUser() {
  const data = useSelector((state) => state.user.value);
  return data;
}
