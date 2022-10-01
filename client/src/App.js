import { Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeScreen />} />
      <Route path="dashboard" element={<HomeScreen />} />
      <Route path="dashboard/*" element={<HomeScreen />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
