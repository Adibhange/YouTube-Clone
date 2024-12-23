import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

// Connect to MongoDB
main()
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

async function main() {
	await mongoose.connect(process.env.MONGO_URL);
}

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
