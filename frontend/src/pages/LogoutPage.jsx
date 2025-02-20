import React from "react";

function LogoutPage() {

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="container bg-gray-800 flex flex-col w-150 items-center justify-center px-5 py-5 gap-3 rounded-md">
        <p className="text-3xl font-black text-white uppercase text-center">
          Are You Sure You Want To <span className="text-gray-200">Logout</span>?
        </p>
        <div className="flex gap-3">
          <button
            className="p-2 rounded-lg text-white cursor-pointer hover:text-green-500"
            aria-label="Confirm logout"
          >
            Yes
          </button>
          <button
            className="p-2 rounded-lg text-white cursor-pointer hover:text-red-500"
            aria-label="Cancel logout"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;