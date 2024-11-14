import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Notification from "../Buttons/Notification.jsx";
import LoginButton from "../Buttons/LoginButton.jsx";

const UserInfoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userGmail, setUserGmail] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      setError("log in.");
      return;
    }

    // Decode the token
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken.userId);

    // Get the expiration time (exp is in seconds, so compare against current time in seconds)
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      navigate("/user/login");
    }

    // Make a request to the profile API with the token
    axios
      .get("http://localhost:5000/user/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      })
      .then((response) => {
        setUserName(response.data.userName);
        setUserGmail(response.data.userGmail);
        setUserAvatar(response.data.userAvatar[0].avatar);
        setUserId("avatar", response.data.user_Id);
        // console.log("avatar", response.data.user_Id);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <LoginButton />;
  }

  return (
    <div className="relative inline-block">
      <div className="flex gap-9 items-center">
        <Notification userId={userId} />

        <button
          id="dropdownAvatarNameButton"
          onClick={toggleDropdown}
          className="flex items-center gap-2 p-2 pr-3 rounded-[2rem] bg-transparent"
          type="button"
        >
          <div className="flex gap-4 items-center">
            {userAvatar ? (
              <div className="w-fit rounded-full">
                <img
                  src={`${userAvatar}`}
                  className="w-8 h-8 me-2 rounded-full"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <p>{userName}</p>
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l4 4 4-4"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="m-[.58rem] absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="truncate">{userGmail}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <NavLink
                to={`/user/myprofile`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/user/update`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Update profle
              </NavLink>
            </li>
          </ul>
          <div className="py-2 flex justify-center">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoDropdown;
