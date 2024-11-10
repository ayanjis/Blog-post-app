// External imports.
import express from "express";

// Internal imports.
import checkLogin from "../Middlewares/checkLogin.js";
import {
	getAllUsers,
	signUpUsers,
	loginUsers,
	myProfile,
	userInfo,
	updateUser,
} from "../controller/user.controller.js";

import upload from '../Middlewares/userAvatarUpload.js.js'

const router = express.Router();

// Creatin All user routes.
router.get("/", getAllUsers);
router.post("/signup", upload.single('avatar'), signUpUsers);
router.post("/login", loginUsers);
router.get("/myprofile", checkLogin, myProfile);
router.get("/userinfo/:id", userInfo);
// Update user profile route
router.put("/update", checkLogin, upload.single("avatar"), updateUser);

export default router;
