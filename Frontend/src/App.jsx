import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./components/Pages/Dashboard.jsx";
import OnePost from "./components/Pages/OnePost";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup.jsx";
import PostCreatorInfo from "./components/Pages/PostCreatorInfo";
import MyProfile from "./components/Pages/MyProfile";
import NewPostForm from "./components/Pages/NewPostForm";
import UpdatePostForm from "./components/Pages/UpdatePostForm";
import PostRactsPage from "./components/Pages/PostRactsPage.jsx";
import UpdateUserForm from "./components/Pages/UpdateUserForm.jsx";

function App() {
  //scroll restoration
  useEffect(() => {
    addEventListener("scroll", () => {
      if (window.scrollY) {
        // console.log(window.location.pathname, window.scrollY);
        sessionStorage.setItem(window.location.pathname, window.scrollY);
      }
    });
  });

  return (
    <>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "p-4 w-fit",
          },
        }}
      />
      <Routes>
        {/* Post routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/post/:id" element={<OnePost />} />
        <Route path="/post/newpost" element={<NewPostForm />} />
        <Route path="/post/updatepost/:id" element={<UpdatePostForm />} />
        <Route path="/post/reactInfo/:id" element={<PostRactsPage />} />

        {/* User routes */}
        <Route path="/user/userinfo/:id" element={<PostCreatorInfo />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/myprofile" element={<MyProfile />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/update" element={<UpdateUserForm />} />
      </Routes>
    </>
  );
}

export default App;
