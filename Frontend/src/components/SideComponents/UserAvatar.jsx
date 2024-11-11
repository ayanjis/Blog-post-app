import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function UserAvatar() {
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
        setUserAvatar(response.data.userAvatar[0].avatar);
        // console.log("avatar", response.data.userAvatar[0].avatar);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      {userAvatar ? (
        <div className="w-[100px] h-[100px] rounded-full p-1 border-dashed border-2 border-sky-500">
          <img src={`${userAvatar}`} className="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
