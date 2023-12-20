import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
