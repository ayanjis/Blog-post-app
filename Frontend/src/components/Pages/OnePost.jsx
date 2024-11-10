import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import LoadingSkeleton from "../Loading_Skeleton/LoadingSkeleton.jsx";
import ShareButton from "../Buttons/ShareButton.jsx";
import PostLike from "../Buttons/PostLike.jsx";

export default function OnePost() {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [creator, setCreator] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const postRespose = await axios.get(
        `https://blog-post-app-mqxb.onrender.com/post/${params.id}`
      );
      setPost(postRespose.data[0]);
      setCreator(postRespose.data[0].postCreator);
      setPostImage(postRespose.data[0].postImage);

      // console.log(postRespose.data[0].likes);
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

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="px-[1rem]">
      <div
        className="w-full text-[10px] text-gray-600 flex gap-x-1 justify-between items-center mt-2
       min-[440px]:text-[20px]"
      >
        <div className="flex gap-1 bg-[#f40b499e] p-2 pr-3 rounded-full text-[12px]">
          <span className="flex gap-1 items-center">
            <PostLike iconSize={16} post_ID={params.id} />
            <NavLink
              className="text-[#fd648c]"
              to={`/post/reactInfo/${params.id}`}
            >
              peoples are reacts
            </NavLink>
          </span>
          <ShareButton post_ID={post._id} />
        </div>
        <div>
          <span className="font-medium flex justify-end">
            created By
            <p className="text-green-300 rounded px-1 ml-1">
              {creator.userName}
            </p>
          </span>
          <NavLink
            to={`/user/userinfo/${creator._id}`}
            className="text-[#127267] text-end underline underline-offset-[3px] select-none"
          >
            {creator.gmail}
          </NavLink>
        </div>
      </div>

      <h1
        className="text-teal-300 underline underline-offset-[18px] mb-8 leading-[70px]
      max-[425px]:text-[20px] max-[425px]:mb-4 max-[425px]:leading-[40px] max-[425px]:underline-offset-[12px]"
      >
        {post.title}
      </h1>
      {postImage ? (
        <div className="flex items-center justify-center h-[300px] rounded-2xl overflow-hidden mb-5">
          <img
            className="h-full w-full object-cover"
            src={`${postImage}`}
            // className="w-[1.7rem] h-[1.7rem]"
          />
        </div>
      ) : (
        ""
      )}
      <p className="text-[40px] max-[425px]:text-[15px] text-start">
        {post.postBody}
      </p>
    </div>
  );
}
