// External imports.
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";  // Import cloudinary directly

// Internal imports.
import { User } from "../models/User.model.js";
import { Post } from "../models/Post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// User SignUp...
export const signUpUsers = async (req, res) => {
	try {
		if (!req.file) {
      return res.status(400).json({ message: "File upload failed." });
    }
		// Here user need to give his/her userName, gmail and password for Signup.
		const { userName, gmail, password, gender, avatar } = req.body;
		// Here hashing password with bcryptjs packge.
		const hashPass = await bcrypt.hash(password, 10);

		const avatarImagePath = req.file.path
		const avatarImage = await uploadOnCloudinary(avatarImagePath)

		// Here creating a new user.
		const newUser = User({ 
			avatar: avatarImage?.url || "", 
			userName, gmail, 
			password: hashPass, 
			gender });			
		// console.log('path', req.file.path);

		// Here saveing the created new user into database.
		await newUser.save();
		console.log(newUser);
		res.status(201).json({ message: "Singup Successful!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Singup Failed!" });
	}
};

// User Sigin...
export const loginUsers = async (req, res) => {
	try {
		// Here user need to give his/her user gmail and password for login.
		const { gmail, password } = req.body;
		// Finding is usre in database or not. if usre is in database then put in 'usreArray'.
		// Hear finding user by his/her given gmail.
		const userArray = await User.find({ gmail });

		if (userArray && userArray.length > 0) {
			// Here the Password is Comparing with User's given psassword and the database hash using bcryptjs packge.
			const isValidPass = await bcrypt.compare(password, userArray[0].password); // true or fasle

			if (isValidPass) {
				// If user given the right password then give them a token. Here Token maked by JWT pakeg.

				const token = jwt.sign(
					{
						// Here stored some user data and make the Token And sned with Headers.
						name: userArray[0].userName,
						gmail: userArray[0].gmail,
						userId: userArray[0]._id,
					},
					process.env.JWT_SECRET,
					{ expiresIn: "1h" },
				);

				//Here serving the TOKEN.
				res.status(200).json({
					access_token: token,
					message: "Login successful!",
				});
			} else {
				res.status(401).json({ error: "Authetication Failed!" });
			}
		} else {
			res.status(401).json({ error: "Authetication Failed!" });
		}
	} catch {
		res.status(401).json({ error: "Authetication Failed!" });
	}
};

// My Profile...
// If user cames with the TOKEN then he/she navegate this Route. Becase this a Procted route by checkLogin middleware.
export const myProfile = async (req, res, next) => {
	try {
		const userName = req.name;
		const userGmail = req.gmail;
		const userId = req.userId;

		// Here provide his/her profile.
		// res.status(200).send(`${userName}'s profile! ${userGmail}`);
		res.status(200).json({
			userInfo: `${userName}'s profile and posts.`,
			user_Id: userId,
			userName: userName,
			userGmail: userGmail,
			userAvatar: await User.find({_id: userId}).select({ avatar: 1, _id: 0 }),
			userAllPosts: await Post.find({ postCreator: userId }).sort({ updatedAt: -1 }).select({
				postCreator: 0,
				__v: 0,
			}),
		});
	} catch (error) {
		next(error.message);
	}
};

// User info...
export const userInfo = async (req, res, next) => {
	try {
		const { id } = req.params;
		const foundUser = await User.find({ _id: id }).populate({
			path: 'posts',
			options: { sort: { updatedAt: -1 } }  // Sort by `updatedAt` in descending order
		});
		res.status(200).json(foundUser);
	} catch (error) {
		next(error.message);
	}
};

// Get All Users...
export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find()
			.select({ __v: 0, password: 0 })
			.populate("posts", "_id title");
		// console.log(users);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

// Update User Profile Controller
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { userName, gmail, password, gender } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (req.file) {
      // Remove old avatar from Cloudinary if it exists
      if (user.avatar) {
        const publicId = user.avatar.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new avatar to Cloudinary
      const uploadResult = await uploadOnCloudinary(req.file.path);

      // Set the new avatar URL from Cloudinary if upload was successful
      if (uploadResult) {
        user.avatar = uploadResult.secure_url;
      }
    }

    if (userName) user.userName = userName;
    if (gmail) user.gmail = gmail;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (gender) user.gender = gender;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    next(error);
    res.status(500).json({ message: "Profile update failed." });
  }
};
