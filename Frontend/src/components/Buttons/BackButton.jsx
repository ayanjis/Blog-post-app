import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleBack = () => {
    // Redirect to login or home page after logout
    navigate("/"); // Change to '/home' if you want to redirect to home page
  };

  return (
    <button
      onClick={handleBack}
      className="bg-teal-200 rounded px-2 py-1 text-gray-600 font-medium flex items-center gap-1 h-fit"
    >
      <svg
        data-icon="chevron-left"
        height="20"
        role="img"
        viewBox="0 0 20 20"
        width="20"
      >
        <path
          d="M8.41 10l5.29-5.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 001.42-1.42L8.41 10z"
          fillRule="evenodd"
        ></path>
      </svg>
      <p>Back</p>
    </button>
  );
}
