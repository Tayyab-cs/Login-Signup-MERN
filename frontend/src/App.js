import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { ForgetPassword } from "./pages/ForgetPassword";
import { ResetPassword } from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/home" Component={Home} />
      <Route path="/forgetPassword" Component={ForgetPassword} />
      <Route path="/resetPassword" Component={ResetPassword} />
    </Routes>
  );
}

export default App;
