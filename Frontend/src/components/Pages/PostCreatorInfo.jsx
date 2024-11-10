import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import daysAgo from "../../../util/DaysAgo.js";
import PostLike from "../Buttons/PostLike.jsx";
import SkeletonForSingalePost from "../Loading_Skeleton/SkeletonForSinglePost.jsx";

export default function PostCreatorInfo() {
  useEffect(() => {
    const scrolledY = sessionStorage.getItem(window.location.pathname) ?? 0;
    window.scroll(0, scrolledY);
  });

  const params = useParams();
  const [creator, setCreator] = useState([]);
  const [userAvatar, setUserAvatar] = useState(null);
  const [creatorPosts, setCreatorPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const respose = await axios.get(
        `https://blog-post-app-mqxb.onrender.com/user/userinfo/${params.id}`
      );
      setCreator(respose.data[0]);
      // setPostImage(creator.posts[0].postImage);
      setUserAvatar(respose.data[0].avatar);
      setCreatorPosts(respose.data[0].posts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <p>Loading Post...</p>;

  return (
    <div>
      <div className="flex gap-4 items-center justify-center">
        {userAvatar ? (
          <div className="w-[100px] h-[100px] rounded-full p-1 border-dashed border-2 border-sky-500">
            <img src={`${userAvatar}`} />
          </div>
        ) : (
          ""
        )}
      </div>
      <h1
        className="text-teal-300 underline underline-offset-[18px] mb-8 leading-[70px] flex justify-center
      max-[425px]:text-[20px] max-[425px]:mb-2"
      >
        {creator.userName} <p>&apos;s all posts.</p>
      </h1>
      {isLoading ? (
        <SkeletonForSingalePost />
      ) : (
        <div className="flex items-center flex-wrap gap-3">
          {creatorPosts?.map((post) => {
            return (
              <div
                className="text-white hover:text-white max-w-[340px]
              transition ease-in-out hover:scale-[1.05] 
              p-4 gap-3 bg-gray-600 bg-opacity-50 rounded-xl border border-gray-600 
              flex flex-col hover:bg-teal-500 max-[425px]:w-full"
                key={post._id}
              >
                <NavLink
                  to={`/post/${post._id}`}
                  className="flex flex-col gap-2"
                >
                  <div>
                    <h2 className="text-start line-clamp-1 text-teal-300 text-[14px]">
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-[#52777b] w-full text-left text-[12px]">
                      {post.postBody}
                    </p>
                  </div>

                  {post.postImage ? (
                    <div className="flex items-center justify-center h-[300px] rounded-xl overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={`${post.postImage}`}
                        // className="w-[1.7rem] h-[1.7rem]"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </NavLink>
                <div className="flex justify-between items-center gap-2">
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
            );
          })}
        </div>
      )}
    </div>
  );
}
