import { Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import PrivateRoutes from "./components/PrivateRoutes";
import RedirectRoutes from "./components/RedirectRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="dashboard" element={<HomeScreen />} />
        <Route path="dashboard/*" element={<HomeScreen />} />
      </Route>
      <Route element={<RedirectRoutes />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
