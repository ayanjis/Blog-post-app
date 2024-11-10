import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = () => {
    // Redirect to login or home page after logout
    navigate("/user/login"); // Change to '/home' if you want to redirect to home page
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-teal-200 rounded px-2 py-1 text-gray-600 font-medium flex items-center gap-2 h-fit"
    >
      <p>Login</p>
      <svg
        data-icon="log-in"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="fill-gray-600"
      >
        <path
          d="M19 0h-8c-.55 0-1 .45-1 1s.45 1 1 1h7v16h-7c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-4 10c0-.28-.11-.53-.29-.71l-5-5a1.003 1.003 0 00-1.42 1.42L11.59 9H1c-.55 0-1 .45-1 1s.45 1 1 1h10.59L8.3 14.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l5-5c.18-.18.29-.43.29-.71z"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
