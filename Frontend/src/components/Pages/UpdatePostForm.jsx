import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export default function UpdatePostForm() {
  const params = useParams(); // Get the postId from the URL
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    postBody: "",
    postImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [postCreatorId, setPostCreatorId] = useState("");

  // Fetch post details for the update
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/post/${params.id}`
        );
        setPost(response.data[0]); // Pre-populate the form with existing post data
        setPostCreatorId(response.data[0].postCreator._id);
        // console.log(response.data[0].postImage);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching post");
        setLoading(false);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check JWT token expiration and get name
  const isTokenValid = () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (!token) {
      setTokenError("No token found");
      navigate("/user/login");
      return false;
    }

    try {
      // Decode the token
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken.userId);

      // Get the expiration time (exp is in seconds, so compare against current time in seconds)
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        setTokenError("Token has expired");
        navigate("/user/login");
        return false;
      }

      // 	console.log(`User's ID from token: ${decodedToken.userId}`); // Get user's name
      // 	console.log(`User's ID from post: ${postCreatorId}`); // Get user's name
      const authorizUser = decodedToken.userId == postCreatorId;
      // console.log("not", authorizUser);
      if (!authorizUser) {
        setError("You con't Update post. Login Require!");
        navigate("/user/login");
        return false;
      }

      return true;
    } catch (err) {
      console.log(err);
      setTokenError("Invalid token");
      return false;
    }
  };
  // 	console.log(isTokenValid());
  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the JWT token before proceeding
    if (!isTokenValid()) {
      toast.error(
        "Cannot update the post because the token is expired or invalid"
      );
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/post/updatepost/${params.id}`,
        post,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token in headers
          },
        }
      );
      // console.log(res.data);
      toast.success("Post updated successfully", {
        duration: 1000,
      });
      navigate("/user/myprofile"); // Redirect after updating
    } catch (err) {
      console.error(err);
      setError("Error updating post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return toast.error(error);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* <Toaster position="bottom-right" /> */}
      <h2 className="mb-4 text-teal-300 text-[30px] underline underline-offset-[14px]">
        Update Post
      </h2>
      {tokenError && <p style={{ color: "red" }}>{tokenError}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-sm flex flex-col items-center gap-2 w-full"
      >
        <div className="w-full flex flex-col gap-2">
          <label className="text-xl">Update Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-xl">Update Content</label>
          <textarea
            rows="4"
            name="postBody"
            value={post.postBody}
            onChange={(e) => setPost({ ...post, postBody: e.target.value })}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
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
            onChange={(e) => setPost({ ...post, postImage: e.target.files[0] })}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
        <button type="submit" className="w-fit bg-teal-500 mt-5 py-2 px-4">
          Update Post
        </button>
      </form>
    </div>
  );
}
