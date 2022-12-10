import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function RedirectRoutes() {
  const auth = useAuth();
  return <>{auth ? <Navigate to="/dashboard" /> : <Outlet />}</>;
}
