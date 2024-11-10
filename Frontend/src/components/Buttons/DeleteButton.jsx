import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function DeletePost(props) {
  // eslint-disable-next-line react/prop-types
  const { postID } = props; // Get post ID from URL

  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");

  // Function to check if the token is valid
  const isTokenValid = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTokenError("No token found");
      return false;
    }

    try {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Get the expiration time (in seconds) and compare it to the current time
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        setTokenError("Token has expired");
        return false;
      }

      console.log(`User's ID from token: ${decodedToken.userId}`);
      return decodedToken.userId;
    } catch (err) {
      console.error(err);
      setTokenError("Invalid token");
      return false;
    }
  };

  // Handle post deletion
  const handleDelete = async () => {
    const userId = isTokenValid();

    if (!userId) {
      alert("Cannot delete post because the token is expired or invalid.");
      return;
    }

    try {
      const response = await axios.get(
        `https://blog-post-app-mqxb.onrender.com/post/${postID}`
      );
      const postCreatorId = response.data[0].postCreator._id;
      console.log([postCreatorId]);

      // Check if the user is authorized to delete the post
      if (userId !== postCreatorId) {
        setTokenError("You are not authorized to delete this post.");
        return;
      }

      // Proceed with the deletion request if authorized
      await axios.delete(
        `https://blog-post-app-mqxb.onrender.com/post/deletepost/${postID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Post deleted successfully.", {
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Error deleting post.");
    }
  };

  if (error) return toast.error(error);
  if (tokenError) return toast.error(tokenError);

  return (
    <button
      onClick={handleDelete}
      className="bg-red-300 rounded-full px-2 py-1 text-gray-600 font-medium flex items-center gap-1 transition ease-in-out hover:scale-[1.1]"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
            stroke="#6b7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M15 16L17.5 18.5M20 21L17.5 18.5M17.5 18.5L20 16M17.5 18.5L15 21"
            stroke="#6b7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </button>
  );
}
