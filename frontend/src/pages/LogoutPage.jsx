import React from "react";
import { useNavigate } from "react-router-dom";
import {useUser} from "../context/UserContext"

function LogoutPage() {
  const navigate = useNavigate(); 
  const {logout} = useUser(); 

  const handleLogout = async () => {
    try {
      const result = await logout(); 
      if(result.success){
        alert("Logout successful")
        navigate("/")
      }
      else{
        alert(result.error || "Logout failed.")
      }  
    } catch (error) {
      console.error("Logout error:", error); 
      alert("An error occured during logout.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 p-10">
      <div className="container bg-slate-900 flex flex-col w-150 items-center justify-center px-5 py-5 gap-3 rounded-md">
        <p className="text-3xl font-black text-white uppercase text-center">
          Are You Sure You Want To <span className="text-gray-200">Logout</span>
          ?
        </p>
        <div className="flex gap-3">
          <button
            className="p-2 rounded-lg text-slate-100 cursor-pointer hover:text-slate-400"
            aria-label="Confirm logout"
            onClick={() => handleLogout()}
          >
            Yes
          </button>
          <button
            className="p-2 rounded-lg text-slate-100 cursor-pointer hover:text-slate-400"
            aria-label="Cancel logout"
            onClick={()=>navigate("/")}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;

