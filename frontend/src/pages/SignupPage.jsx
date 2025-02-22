import React, { useState } from "react";
import InputField from "../components/InputField";
import {useUser} from "../context/UserContext"; 
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup } = useUser(); 
  const navigate = useNavigate()
; 

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      fields.name === "" ||
      fields.email === "" ||
      fields.password === "" ||
      fields.confirmPassword === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (fields.password !== fields.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await signup(fields.name, fields.email, fields.password); 
      if(result.success){
        alert("Signup successful!"); 
        navigate("/"); 
      }
      else{
        alert(result.error || "Signup failed.")
      }

    } catch (error) { 
      console.error("Signup error:", error); 
      alert("An error occured during signup.")
    }

    
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="container bg-slate-800 flex flex-col max-w-md items-center justify-center p-5 gap-3 rounded-md">
        <p className="text-5xl font-black text-white uppercase">Signup</p>
        <form action="" className="w-full flex flex-col gap-3">
          <InputField
            placeholder={"Enter your name"}
            label={"Name"}
            type="text"
            value={fields.name}
            name="name"
            onChange={handleChange}
            id="name"
          />
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
          <InputField
            placeholder={"Enter your password"}
            label={"Confirm Password"}
            type="password"
            name="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
          />
          <button
            className="bg-gray-600 p-2 text-white rounded-md text-2xl mt-3 hover:bg-gray-700 cursor-pointer"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <button className="text-slate-100 hover:text-slate-300">
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
