import { useNavigate } from "react-router-dom";

export default function AddPostButton() {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleBack = () => {
    // Redirect to login or home page after logout
    navigate("/post/newpost"); // Change to '/home' if you want to redirect to home page
  };

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-0 right-0 m-4 bg-green-400 fill-gray-200 rounded-full px-2 py-1 text-gray-600 font-medium flex items-center gap-1"
    >
      <svg data-icon="plus" width="40" height="48" viewBox="0 0 20 20">
        <path
          d="M16 9h-5V4c0-.55-.45-1-1-1s-1 .45-1 1v5H4c-.55 0-1 .45-1 1s.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1z"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
