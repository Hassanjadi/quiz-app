import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  // deklarasi navigate
  let navigate = useNavigate();

  // inisialisasi state input
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleRegister = async (event) => {
    try {
      event.preventDefault();

      // destructuring assignment
      const { name, email, password } = input;

      // mengirim permintaan login ke server
      const response = await axios.post(
        "https://dev-example.sanbercloud.com/api/register",
        {
          name,
          email,
          password,
        }
      );

      // mencetak response dari server
      console.log(response.data);

      // mengambil dan menyimpan token kedalam cookie (library cookie js)
      const { token } = response.data;
      Cookies.set("token", token, { expires: 1 });

      // navigasi ke halaman beranda
      navigate("/login");

      // handling error
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        "Registration failed. Please check your information and try again."
      );
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="md:container w-full h-screen flex justify-center mx-auto">
        <div className="flex justify-center flex-col gap-10 ">
          <div className="bg-white shadow-md p-5 rounded-md">
            <div className="flex-col gap-2 mb-5">
              <h1 className="text-xl font-bold">Create your account! 🤩</h1>
              <p className="text-sm">Holla! Please enter your details</p>
            </div>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input
                value={input.name}
                onChange={handleInput}
                className="border px-4 py-2 w-72 rounded-md"
                placeholder="Username"
                name="name"
                type="text"
              />
              <input
                value={input.email}
                onChange={handleInput}
                className="border px-4 py-2 w-72 rounded-md"
                placeholder="Email"
                name="email"
                type="text"
              />
              <input
                value={input.password}
                onChange={handleInput}
                className="border px-4 py-2 w-72 rounded-md"
                placeholder="Password"
                name="password"
                type="password"
              />
              <div className="flex gap-1">
                <input
                  className="border"
                  type="checkbox"
                  required
                  id="termsAndConditions"
                />
                <label className="text-xs" htmlFor="termsAndConditions">
                  I accept the Terms and Conditions
                </label>
              </div>
              <div className="flex-col">
                <button
                  type="submit"
                  className="flex justify-center bg-violet-600 hover:bg-violet-500 border-b-4 border-violet-900 text-white font-semibold p-2 rounded-md w-full lg:w-72 gap-2"
                >
                  Register
                </button>
                <div className="flex-col w-72">
                  <div className="flex justify-center w-72 mt-2">
                    <p className="text-xs">
                      Do you have an account?
                      <Link to="/login" className="font-semibold ml-1">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
