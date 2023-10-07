import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let { email, password } = input;
    console.log(input);

    axios
      .post("https://dev-example.sanbercloud.com/api/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        Cookies.set("token", data.token, { expires: 1 });
        navigate("/");
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <section className="bg-gray-50">
      <div className="md:container w-full h-screen flex justify-center mx-auto">
        <div className="flex justify-center flex-col gap-10 ">
          <div className="bg-white shadow-md p-5 rounded-md">
            <div className="flex flex-col gap-3">
              <div className="flex-col gap-4 mb-5">
                <h1 className="text-xl font-bold">Welcome back, Minca 👋</h1>
                <p className="text-sm">
                  Welcome back! Please enter your details
                </p>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                  value={input.email}
                  onChange={handleInput}
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="border px-4 py-2 w-full lg:w-72 rounded-md"
                />
                <input
                  value={input.password}
                  onChange={handleInput}
                  type="password"
                  name="password"
                  className="border px-4 py-2 w-full lg:w-72 rounded-md"
                  placeholder="Password"
                />
                <div className="flex gap-24">
                  <div className="flex items-center gap-1">
                    <input
                      className="border"
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      required
                    />
                    <label className="text-xs" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <p className="underline text-xs">Forgot password?</p>
                </div>
                <div className="flex-col">
                  <button
                    type="submit"
                    className="flex justify-center bg-violet-600 hover:bg-violet-500 border-b-4 border-violet-900 text-white font-semibold p-2 rounded-md w-full lg:w-72 gap-2"
                  >
                    Login
                  </button>
                </div>
                <div className="flex justify-center w-72">
                  <p className="text-xs">
                    Don’t have an account?
                    <Link to={"/register"} className="font-semibold ml-1">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
