import HttpError from "../models/errorModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 *  Create New User
 *  POST /api/user/sign-up
 */
export const signUp = async (req, res, next) => {
	const { userName, email, password, confirmPassword, userAvatar } = req.body;

	if (!userName || !email || !password || !confirmPassword || !userAvatar) {
		return next(new HttpError("All fields are required", 400));
	}

	const newEmail = email.toLowerCase();
	// Check if email already exists
	const emailExists = await User.findOne({ email: newEmail });
	if (emailExists) {
		return next(new HttpError("Email already exists", 422));
	}

	// Check password length
	if (password.trim().length < 6) {
		return next(new HttpError("Password must be at least 6 characters", 422));
	}

	// Check password match
	if (password !== confirmPassword) {
		return next(new HttpError("Passwords do not match", 422));
	}

	// Conver password to hash
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		userName,
		email: newEmail,
		password: hashedPass,
		userAvatar,
	});

	// Return new user object with password removed from response
	const { password: pass, ...user } = newUser._doc;
	return res.status(201).json(user);
};

/**
 *  Sign In User
 *  POST /api/user/sign-in
 */
export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new HttpError("Email and password are required", 400));
		}

		// Check if email exists
		const user = await User.findOne({ email: email.toLowerCase() });
		if (!user) {
			return next(new HttpError("Email not found", 404));
		}

		// Check password
		const comparePass = await bcrypt.compare(password, user.password);
		if (!comparePass) {
			return next(new HttpError("Password is incorrect", 401));
		}

		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		);

		const { password: pass, ...userData } = user._doc;
		res.status(200).json({ token, userData });
	} catch (error) {
		return next(new HttpError("Login failed. Invalid credentials", 401));
	}
};
