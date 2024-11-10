import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import daysAgo from "../../../util/DaysAgo.js";
import UserInfoDropdown from "../SideComponents/UserInfoDropdown.jsx";
import PostLike from "../Buttons/PostLike.jsx";
import ShareButton from "../Buttons/ShareButton.jsx";

export default function Dashboard() {
  useEffect(() => {
    const scrolledY = sessionStorage.getItem(window.location.pathname) ?? 0;
    window.scroll(0, scrolledY);
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const respose = await axios.get(
        "https://blog-post-app-mqxb.onrender.com/post"
      );
      setPosts(respose.data);
      // console.log("dash", posts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 	if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <div className="backdrop-blur-sm z-10 backdrop-saturate-150 bg-[#2dd4bf13] top-0 py-2 w-full flex justify-end items-center mb-5 fixed right-0">
        <UserInfoDropdown />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-[#5e62ea] capitalize 30px max-[425px]:text-[30px]  mt-16">
          latest post is here.
        </h1>
        <div className="flex justify-center flex-wrap gap-3">
          {posts?.map((post) => {
            return isLoading ? (
              <div
                role="status"
                className="max-w-sm animate-pulse gap-2 w-[260px] h-[160px]
              p-4 bg-gray-600 bg-opacity-50 rounded-xl border border-gray-600 
              flex flex-col justify-between max-[425px]:w-full"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-gray-300 rounded-full w-12 h-12 "></span>
                  <h3 className="h-5 bg-gray-300 rounded-full w-20"></h3>
                </div>
                <div className=" pr-2 w-full">
                  <h3 className="h-3 bg-gray-300 rounded-full  w-full mb-4"></h3>
                  <p className="h-2 bg-gray-300 rounded-full w-full mb-2.5"></p>
                  <p className="h-2 bg-gray-300 rounded-full w-full mb-2.5"></p>
                </div>
              </div>
            ) : (
              <div
                className="text-white hover:text-white w-[260px] h-[160px]
              transition ease-in-out hover:scale-[1.05] 
              p-4 gap-2 bg-gray-600 bg-opacity-50 rounded-xl border border-gray-600 
              flex flex-col justify-between hover:bg-teal-500 max-[425px]:w-full"
                key={post._id}
              >
                <div className="flex items-center justify-between w-full">
                  <NavLink
                    to={`/user/userinfo/${post.postCreator._id}`}
                    className="w-fit h-fit text-[10px] text-gray-600 flex flex-col gap-[0.3rem]"
                  >
                    <div className="flex items-center gap-2">
                      {post.postCreator.avatar ? (
                        <img
                          src={`${post.postCreator.avatar}`}
                          className="w-[1.7rem] h-[1.7rem]"
                        />
                      ) : (
                        ""
                      )}
                      <div className="text-start font-bold">
                        <p className="text-white">
                          {post.postCreator.userName}
                        </p>
                        <p className="">{post.postCreator.gmail}</p>
                      </div>
                    </div>
                  </NavLink>
                  <ShareButton post_ID={post._id} />
                </div>
                <NavLink
                  to={`/post/${post._id}`}
                  className="flex flex-col gap-[0.2rem]"
                >
                  <h2 className="text-start line-clamp-1 text-teal-300 text-[14px]">
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-[#52777b] w-full text-left text-[12px]">
                    {post.postBody}
                  </p>
                </NavLink>
                <div className="flex justify-between items-center w-full text-[10px]">
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

                    <p className="text-start">{daysAgo(post.updatedAt)}</p>
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
                    <p className="text-start">{daysAgo(post.createdAt)}</p>
                  </span>
                  <PostLike iconSize={13} post_ID={post._id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
