import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

const Home = () => {
  // function loggedIn
  const isLoggedIn = !!Cookies.get("token");

  return (
    <div className="bg-gray-50">
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <h1>Welcome to QuizMaster</h1>
        <p>Test your knowledge and have fun!</p>
        <Link
          to={isLoggedIn ? "/quiz" : "/login"}
          className="flex items-center bg-violet-600 border-b-4 border-violet-900 text-white font-semibold rounded-md py-4 px-5"
        >
          {isLoggedIn ? "Play QuizMaster" : "Start QuizMaster"}
        </Link>
      </div>
    </div>
  );
};

export default Home;
