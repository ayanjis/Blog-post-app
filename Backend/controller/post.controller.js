import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";  // Import cloudinary directly

// Internal imports.
import { Post } from "../models/Post.model.js";
import { User } from "../models/User.model.js";
import { title } from "process";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create A new post.
export const newPost = async (req, res, next) => {
	const userId = req.userId;
	try {
		if (!req.file) {
			return res.status(400).json({ message: "File upload failed." });
		}

		const postImagePath = req.file.path
		const postImage = await uploadOnCloudinary(postImagePath)

		const newPost = Post({
			...req.body,
			// postImage: req.file.filename,
			postImage: postImage?.url || "",
			postCreator: userId,
		});
		// console.log("CANP path", newPost);
		const post = await newPost.save();
		await User.updateOne({ _id: userId }, { $push: { posts: post._id } });
		res.status(200).json({ message: "Your post is created Successful!" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Post creation Failed!" });
	}
};

// Get all posts.
export const getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find()
			.populate("postCreator", "userName gmail avatar _id likes")
			.select({ __v: 0 })
			.sort({ updatedAt: -1 });
		// console.log(posts)
		res.status(200).json(posts);
	} catch (err) {
		next(err);
	}
};

// Get A single post.
export const getSinglePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const foundPost = await Post.find({ _id: id }).populate(
			"postCreator",
			"userName gmail _id",
		);
		// .select({ __v: 1});
		res.status(200).json(foundPost);
	} catch (err) {
		next(err);
	}
};

// // Update single post with conditional image replacement
export const updatePost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, postBody } = req.body;

    // Find the existing post
    const post = await Post.findOne({ _id: id, postCreator: userId });

    if (!post) {
      return res.status(401).json({
        message:
          "You are not the post creator. Only the post creator can update the post content!",
      });
    }

    // Prepare the update data
    const updateData = { title, postBody };

    // Check if a new image was uploaded
    if (req.file) {
      // Remove old image from Cloudinary if it exists
      if (post.postImage) {
        const publicId = post.postImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const uploadResult = await uploadOnCloudinary(req.file.path);

      // Set the new image URL in updateData if the upload is successful
      if (uploadResult) {
        updateData.postImage = uploadResult.secure_url;
      }
    } else if (req.body.postImage === "") {
      // If no image file is provided and `postImage` is an empty string, remove the image
      updateData.postImage = null;
    }

    // Perform the update
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Post has been updated", post: updatedPost });
  } catch (err) {
    console.error("Error updating post:", err);
    next(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};


// // Delete a post along with its image
export const deletePost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Find the post to ensure it exists and get the image URL
    const post = await Post.findOne({ _id: id, postCreator: userId });

    if (!post) {
      return res.status(401).json({
        message:
          "You are not the post creator. Only the post creator can delete the post!",
      });
    }

    // Delete the image on Cloudinary if it exists
    if (post.postImage) {
      const publicId = post.postImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);  // Delete the image on Cloudinary
    }

    // Delete the post document from the database
    await Post.deleteOne({ _id: id, postCreator: userId });

    // Remove the post ObjectId from the user's posts array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: id } }, // Remove the specific post ObjectId from the array
      { new: true } // Return the updated document
    );

    res
      .status(200)
      .json({ message: "Post and associated image deleted successfully!" });
  } catch (err) {
    console.error("Error deleting post:", err);
    next(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};



// Like a post
export const likePost = async (req, res) => {
	try {
		const loggedInUserId = req.userId;
		const { id } = req.params;

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ $push: { likes: { user: loggedInUserId } } },
			{ new: true, runValidators: true, context: "query", timestamps: false },
		);

		if (!updatedPost) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.status(200).json(updatedPost.likes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Unlike a post
export const unlikePost = async (req, res) => {
	try {
		const loggedInUserId = req.userId;
		const { id } = req.params;

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ $pull: { likes: { user: loggedInUserId } } },
			{ new: true, runValidators: true, context: "query", timestamps: false },
		);

		if (!updatedPost) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.status(200).json(updatedPost.likes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// // Post React Info.
export const getPostRactInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use findById instead of find to get a single document
    const post = await Post.findById(id)
      .populate({
        path: "likes.user",
        select: "userName gmail avatar posts", // Only select specific fields
      })
      .select({
        _id: 0,
        title: 0,
        postBody: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        postCreator: 0,
        postImage: 0,
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if `likes` exists and sort by `createdAt`
    if (post.likes && post.likes.length > 0) {
      post.likes.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware
  }
};
