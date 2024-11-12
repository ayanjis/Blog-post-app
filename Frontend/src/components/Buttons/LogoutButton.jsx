import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogout = () => {
    // Clear the token from localStorage or sessionStorage
    localStorage.removeItem("token");

    // Redirect to login or home page after logout
    navigate("/user/login"); // Change to '/home' if you want to redirect to home page
    window.location.reload(); // Reload the page after navigation
  };

  return (
    <button
      onClick={handleLogout}
      className="text-teal-200 bg-transparent rounded-none px-2 py-1 font-medium flex items-center justify-center gap-2 w-full h-fit"
    >
      <p>Log out</p>
      <svg
        data-icon="log-out"
        height="20"
        role="img"
        viewBox="0 0 20 20"
        width="20"
        className="fill-teal-200"
      >
        <path
          d="M19.71 9.29l-5-5a1.003 1.003 0 00-1.42 1.42L16.59 9H6c-.55 0-1 .45-1 1s.45 1 1 1h10.59l-3.29 3.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l5-5c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71zM9 18H2V2h7c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1v18c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
