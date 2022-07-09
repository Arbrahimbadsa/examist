import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);
  return (
    !user && (
      <div>
        <h2>Login Page</h2>
      </div>
    )
  );
}
