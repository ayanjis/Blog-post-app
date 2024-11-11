import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import BackButton from "../Buttons/BackButton.jsx";

export default function Login() {
  const [gmail, setgmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        gmail,
        password,
      });
      // Handle success (e.g., store token, redirect, etc.)
      const accessToken = response.data;
      localStorage.setItem("token", accessToken.access_token);
      // console.log("Response:", accessToken.access_token);
      navigate("/user/myprofile");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
    // console.log(gmail, password);
  };

  return (
    <div className="min-[750px]:h-full">
      <div className="flex justify-start">
        <BackButton />
      </div>
      <div className="h-full flex flex-col min-[750px]:items-center justify-center">
        <h1 className="mb-4 text-teal-300 text-[30px]">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center">
            <label className="mr-3 text-teal-300">gmail:</label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
              required
              className="w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
          <div className="flex items-center">
            <label className="mr-3 text-teal-300">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Your password"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className="bg-teal-500 py-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <span className="flex justify-center mt-3 text-[14px]">
          If you don&apos;t have account then
          <NavLink
            to={`/user/signup`}
            className="ml-1 text-teal-300 underline underline-offset-2 select-none"
          >
            Signup
          </NavLink>
        </span>
      </div>
    </div>
  );
}
