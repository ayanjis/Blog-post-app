// External imports.
import express from "express";

// Internal imports.
import checkLogin from "../Middlewares/checkLogin.js";
import upload from "../Middlewares/postImageUpload.js";
import {
	getAllPosts,
	newPost,
	updatePost,
	getSinglePost,
	deletePost,
	likePost,
	unlikePost,
	getPostRactInfo,
} from "../controller/post.controller.js";

const router = express.Router();

// Creatin All user routes.
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.get("/reactInfo/:id", getPostRactInfo);
router.post("/newpost", checkLogin, upload.single('postImage'), newPost);
router.put("/like/:id", checkLogin, likePost);
router.put("/unlike/:id", checkLogin, unlikePost);
router.put("/updatepost/:id", checkLogin, upload.single('postImage'), updatePost);
router.delete("/deletepost/:id", checkLogin, deletePost);

export default router;
