import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="bg-[#eff2f6] w-screen h-screen overflow-x-hidden">
        <Routes>
          {/* OPEN ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />

          {/* AUTH ROUTES */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>


          {/* OTHER ROUTES */}
        </Routes>
      </div>
    </>
  );
}

export default App;
