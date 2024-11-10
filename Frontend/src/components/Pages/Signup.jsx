import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import BackButton from "../Buttons/BackButton";
import { toast } from "sonner";

export default function Login() {
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        {
          avatar,
          userName,
          gmail,
          password,
          gender,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post created successfully.", {
        duration: 2000,
      });

      console.log("Response:", response.data);
      navigate("/user/login");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
    // console.log(avatar, userName, gmail, password, gender);
  };

  return (
    <div className="min-[750px]:h-full">
      <div className="flex justify-start">
        <BackButton />
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="mb-4 text-teal-300 text-[30px]">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload profile image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>

          <div className="flex items-center">
            <label className="mr-3 text-teal-300 w-full">user name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>

          <div className="flex items-center">
            <label className="mr-3 text-teal-300">gmail:</label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
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

          {/* Gender */}
          <div
            className="flex justify-start items-center"
            style={{ marginBottom: "10px" }}
          >
            <label className="text-teal-300 mr-4">Gender</label>
            <select
              name="gender"
              required
              className="p-2 rounded-md"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className="bg-teal-500 py-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <span className="flex justify-center mt-3 text-[14px]">
          If you already have an account then
          <NavLink
            to={`/user/login`}
            className="ml-1 text-teal-300 underline underline-offset-2 select-none"
          >
            Login
          </NavLink>
        </span>
      </div>
    </div>
  );
}
