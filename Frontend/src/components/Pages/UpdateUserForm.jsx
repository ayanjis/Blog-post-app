import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    gmail: "",
    gender: "",
    password: "", // Keep the password in state
  });
  const [avatar, setAvatar] = useState(null); // For avatar preview and upload
  const [previewAvatar, setPreviewAvatar] = useState(null); // Preview of the current avatar

  useEffect(() => {
    // Fetch current user data
    axios
      .get("http://localhost:5000/user/myprofile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        // console.log("Response Data:", response.data); // Log the entire response

        if (response.data) {
          const { userName, gmail, gender } = response.data;
          setUserData({ userName, gmail, gender, password: "" }); // Reset password field
          setPreviewAvatar(`${response.data.userAvatar[0].avatar}`); // Correctly set avatar URL
        } else {
          console.error("No data found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userData.userName);
    formData.append("gmail", userData.gmail);
    formData.append("gender", userData.gender);

    // Only add password if it's not empty
    if (userData.password) {
      formData.append("password", userData.password);
    }

    if (avatar) formData.append("avatar", avatar); // Add new avatar if selected

    try {
      await axios.put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/user/login");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-700  p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

      <div className="flex flex-col gap-2 items-center">
        {previewAvatar && (
          <div className="flex flex-col items-center gap-3">
            <span className="w-16 h-16">
              <img
                src={previewAvatar}
                alt="Current Avatar"
                className="w-full h-full rounded-full"
              />
            </span>
            <p className="text-gray-600 font-semibold max-[425px]:text-[12px]">
              Current Avatar
            </p>
          </div>
        )}
        <div className="flex gap-3 items-center">
          <label className="block text-gray-400 font-semibold max-[425px]:text-[12px]">
            Update Avatar:
          </label>
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="w-[13rem]"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold">User Name:</label>
        <input
          type="text"
          name="userName"
          value={userData.userName || ""} // Ensure it's always a string
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold">Email:</label>
        <input
          type="email"
          name="gmail"
          value={userData.gmail || ""} // Ensure it's always a string
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold">Gender:</label>
        <select
          name="gender"
          value={userData.gender || ""} // Ensure it's always a string
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold">Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password || ""} // Ensure it's always a string
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Leave blank to keep current password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update User
      </button>
    </form>
  );
};

export default UpdateUserForm;
