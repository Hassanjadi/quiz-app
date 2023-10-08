import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  let navigate = useNavigate();

  return (
    <header className="fixed w-full">
      <nav className="bg-white shadow-lg z-50 py-4">
        <div className="md:container mx-auto">
          <div className="flex items-center justify-between mx-4">
            <div className="text-2xl md:text-3xl font-bold text-violet-600">
              <h1>QuizMaster</h1>
            </div>
            <div className="flex items-center">
              {!Cookies.get("token") && (
                <Link
                  to="/login"
                  className="md:flex items-center bg-violet-600 text-white font-medium rounded-md py-2 px-5 mr-4"
                >
                  Login
                </Link>
              )}
              {Cookies.get("token") && (
                <Link
                  to="/"
                  onClick={() => {
                    Cookies.remove("token");
                    navigate("/");
                  }}
                  className=" md:flex items-center bg-violet-600 text-white font-medium rounded-md py-2 px-5"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
