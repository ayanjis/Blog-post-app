import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function UpdateButton({ postID }) {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleUpdate = () => {
    // Redirect to login or home page after logout
    navigate(`/post/updatepost/${postID}`); // Change to '/home' if you want to redirect to home page
  };

  return (
    <button
      onClick={handleUpdate}
      className="bg-green-300 rounded-full px-2 py-1 text-gray-600 font-medium flex items-center gap-1 transition ease-in-out hover:scale-[1.1]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17V17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16"
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
