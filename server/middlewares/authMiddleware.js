import HttpError from "../models/errorModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		return next(new HttpError("Authorization header missing", 401));
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return next(new HttpError("Token not provided", 401));
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return next(new HttpError("Invalid or expired token", 401));
		}
		req.user = user;
		next();
	});
};

export default authMiddleware;
