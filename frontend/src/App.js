import { Home } from "./components/HomePage/Home";
import { LoginPage } from "./components/LogInPage/LoginPage";
import { NavBar } from "./components/NavBar/NavBar";
import SignupForm from "./components/SignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <NavBar />
      <div className=" min-h-[100vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
