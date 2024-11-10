import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const postData = {
      title,
      postBody,
      postImage,
    };

    try {
      if (title == "" && postBody == "") {
        setError("You con't add a post without filling all the blank fild.");
      }
      // Send POST request to your API to create a new post
      const response = await axios.post(
        "https://blog-post-app-mqxb.onrender.com/post/newpost",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If your API requires authentication
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data);
      // After successful post creation, navigate to another route, e.g., the list of posts or the new post page
      toast.success("Post created successfully.", {
        duration: 2000,
      });

      navigate("/user/myprofile"); // Redirect to the posts list
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-teal-300 text-[30px] underline underline-offset-[14px]">
        Create a new post here.
      </h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Title.
          </label>
          <input
            type="text"
            autoComplete="off"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="base-input"
            placeholder="Write a appropate title for your post..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <label
          htmlFor="message"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
        >
          Post content.
        </label>
        <textarea
          id="message"
          rows="4"
          required
          autoComplete="off"
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write here your post body..."
        />
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
            required
            onChange={(e) => setPostImage(e.target.files[0])}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="bg-teal-500 mt-5 px-4 py-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
