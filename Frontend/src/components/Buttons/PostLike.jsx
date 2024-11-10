/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure correct import for jwtDecode
import { toast } from "sonner";
import LoadingSpinner from "../Loading_Skeleton/LoadingSpinner";

export default function PostLike({ post_ID, iconSize }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [psotCreatorName, setPostCreatorName] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikes = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    // if (!token) {
    //   setError("Please log in first.");
    //   return;
    // }
    try {
      const response = await axios.get(`http://localhost:5000/post/${post_ID}`);
      setPostCreatorName(response.data[0].postCreator.userName);
      setLikes(response.data[0].likes);
      setIsLoading(true);
      // console.log(response.data[0].likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
      setError("Failed to fetch like data.");
    } finally {
      setIsLoading(false);
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      setError("Please log in again.");
      return;
    }

    const authorizUser = decodedToken.userId;
    if (!authorizUser) {
      setError("You cannot like the post without logging in.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/post/${post_ID}`);
      setLikes(response.data[0].likes);
      setLiked(
        response.data[0].likes.some((like) => like.user === authorizUser)
      );
    } catch (error) {
      console.error("Error fetching likes:", error);
      setError("Failed to fetch like data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError(" You can't react post without login. Please log in first.");
        return;
      }

      let response;
      if (liked) {
        response = await axios.put(
          `http://localhost:5000/post/unlike/${post_ID}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success(`You unlike ${psotCreatorName}'s A post.`);
      } else {
        response = await axios.put(
          `http://localhost:5000/post/like/${post_ID}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(`You like A ${psotCreatorName}'s post.`);
      }

      setLiked(!liked);
      setLikes(response.data); // Updating likes with the response data
    } catch (error) {
      console.error("Error toggling like status:", error);
      setError("Failed to update like status.");
    }
  };

  useEffect(() => {
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_ID]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return toast.error(error);
  }

  return (
    <button
      onClick={handleLikeToggle}
      className="text-red-400 text-[12px] text-start flex items-center gap-1 bg-transparent"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
        className={`w-[${iconSize}px] h-[${iconSize}px] stroke-red-400 ${
          liked ? "fill-red-400" : ""
        } transition ease-in-out hover:scale-[1.5] max-[425px]:active:scale-[1.5]`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <p>{likes.length}</p>
    </button>
  );
}
