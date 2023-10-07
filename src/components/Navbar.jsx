import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  let navigate = useNavigate();

  return (
    <header className="fixed w-full">
      <nav className="shadow-lg z-50 w-full">
        <div className="md:container mx-auto">
          <div className="flex justify-between py-4">
            <h1 className="text-3xl font-bold text-violet-600">QuizMaster</h1>

            {!Cookies.get("token") && (
              <Link
                to="/login"
                className="flex items-center bg-violet-600 text-white font-medium rounded-md py-2 px-5"
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
                className="flex items-center bg-violet-600 text-white font-medium rounded-md py-2 px-5"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
