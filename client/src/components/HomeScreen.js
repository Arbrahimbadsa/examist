import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTheme } from "../redux/reducers/themeSlice";
import Dashboard from "./Dashboard";

export default function HomeScreen() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(updateTheme());
  }, [dispatcher]);

  return <Dashboard />;
}
