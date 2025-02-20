import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
// import { AuthProvider } from "./context/authContext";

function App() {
  return (
    // <AuthProvider>
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    // </AuthProvider>
  );
}

export default App;
