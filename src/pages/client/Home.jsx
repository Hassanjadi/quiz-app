import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <h1>Welcome to QuizMaster</h1>
        <p>Test your knowledge and have fun!</p>
        {!Cookies.get("token") && (
          <Link
            to="/login"
            className="flex items-center bg-violet-600 border-b-4 border-violet-900 text-white font-semibold rounded-md py-4 px-5"
          >
            Start QuizMaster
          </Link>
        )}
        {Cookies.get("token") && (
          <Link
            to="/quiz"
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
            }}
            className="flex items-center bg-violet-600 border-b-4 border-violet-900 text-white font-semibold rounded-md py-4 px-5"
          >
            Play QuizMaster
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
