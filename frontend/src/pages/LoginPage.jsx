import React, { useState } from "react";
import InputField from "../components/InputField";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate(); 
  const {login} = useUser(); 
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      fields.email === "" ||
      fields.password === "" 
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const result = await login(fields.email, fields.password); 
      if (result.success){
        alert("Login succesfully")
        navigate("/"); 
      }
      else{
        alert(result.error || "Login failed.")
      }

    } catch (error) { 
      console.error("Login error:", error); 
      alert("An error occured during login.");
    }

  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="container bg-slate-800 flex flex-col max-w-md items-center justify-center p-5 gap-3 rounded-md h-96">
        <p className="text-5xl font-black text-white uppercase">Login</p>
        <form action="" className="w-full flex flex-col gap-3">

          <InputField
            placeholder={"Enter your email"}
            label={"Email"}
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            id="email"
          />
          <InputField
            placeholder={"Enter your password"}
            label={"Password"}
            type="password"
            name="password"
            value={fields.password}
            onChange={handleChange}
            id="password"
          />
          <button
            className="bg-gray-600 p-2 text-white rounded-md text-2xl mt-3 hover:bg-gray-700 cursor-pointer"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <div className="flex gap-3">
          <button className="text-slate-100 hover:text-slate-300 cursor-pointer">Forgot Password?</button>
          <button className="text-slate-100 hover:text-slate-300  cursor-pointer">Have an Account?</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
