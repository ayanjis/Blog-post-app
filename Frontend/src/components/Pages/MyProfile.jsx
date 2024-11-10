import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import daysAgo from "../../../util/DaysAgo.js";
import axios from "axios";
import BackButton from "../Buttons/BackButton.jsx";
import AddPostButton from "../Buttons/AddPostButton.jsx";
import UpdateButton from "../Buttons/UpdateButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import UserInfoDropdown from "../SideComponents/UserInfoDropdown.jsx";
import { jwtDecode } from "jwt-decode";
import UserAvatar from "../SideComponents/UserAvatar.jsx";
import PostLike from "../Buttons/PostLike.jsx";
import ShareButton from "../Buttons/ShareButton.jsx";

export default function MyProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      setTimeout(() => {
        navigate("/user/login");
      }, 3000);
      setError("No token found or toke expire. Please log in.");
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
        setUserProfile(response.data);
        setUserPosts(response.data.userAllPosts);
        // console.log("mypro", response.data.userAvatar[0].avatar);
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

  if (!userProfile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <div>
        <div className="backdrop-blur-sm z-10 backdrop-saturate-150 flex justify-between items-center mb-5 fixed top-0 left-0 p-2 w-full bg-[#2dd4bf13]">
          <BackButton />
          <UserInfoDropdown />
        </div>
        <AddPostButton />
      </div>
      <div className="flex flex-col gap-5 mt-16">
        <UserAvatar />
        <h1 className="30px max-[425px]:text-[30px] underline underline-offset-[14px] leading-10 mb-5">
          {userProfile.userInfo}
        </h1>
        <div className="flex justify-center flex-wrap gap-3">
          {userPosts?.map((post) => {
            return (
              <span
                key={post._id}
                className="bg-gradient-to-t from-[#646cff3d] rounded-3xl max-[425px]:w-full"
              >
                <div
                  className="text-white hover:text-white w-[260px] h-[120px]
              transition ease-in-out hover:scale-[1.05] 
              p-4 gap-2 bg-gray-600 bg-opacity-50 rounded-3xl border border-gray-600 
              flex flex-col justify-between hover:bg-teal-500 max-[425px]:w-full"
                >
                  <NavLink
                    to={`/post/${post._id}`}
                    className="flex flex-col gap-[0.2rem]"
                  >
                    <span className="flex items-center justify-between">
                      <h2 className="text-start line-clamp-1 text-teal-300 text-[14px]">
                        {post.title}
                      </h2>
                      <ShareButton post_ID={post._id} />
                    </span>
                    <p className="line-clamp-2 text-[#52777b] w-full text-left text-[12px]">
                      {post.postBody}
                    </p>
                  </NavLink>
                  <div className="flex justify-between items-center w-full">
                    <span className="flex items-center gap-1 text-blue-600">
                      <svg
                        data-icon="refresh"
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        className="fill-blue-600"
                      >
                        <path
                          d="M19 1c-.55 0-1 .45-1 1v2.06C16.18 1.61 13.29 0 10 0 4.48 0 0 4.48 0 10c0 .55.45 1 1 1s1-.45 1-1c0-4.42 3.58-8 8-8 2.52 0 4.76 1.18 6.22 3H15c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 8c-.55 0-1 .45-1 1 0 4.42-3.58 8-8 8-2.52 0-4.76-1.18-6.22-3H5c.55 0 1-.45 1-1s-.45-1-1-1H1c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-2.06C3.82 18.39 6.71 20 10 20c5.52 0 10-4.48 10-10 0-.55-.45-1-1-1z"
                          fillRule="evenodd"
                        ></path>
                      </svg>

                      <p className="text-[10px] text-start">
                        {daysAgo(post.updatedAt)}
                      </p>
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <svg
                        data-icon="time"
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        className="fill-blue-600"
                      >
                        <path
                          d="M11 9.59V4c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .28.11.53.29.71l3 3a1.003 1.003 0 001.42-1.42L11 9.59zM10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-[10px] text-start">
                        {daysAgo(post.createdAt)}
                      </p>
                    </span>
                    <PostLike iconSize={13} post_ID={post._id} />
                  </div>
                </div>
                <div className="p-2 flex justify-center gap-5">
                  <UpdateButton postID={post._id} />
                  <DeleteButton postID={post._id} />
                </div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
