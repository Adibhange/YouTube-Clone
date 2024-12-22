import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

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

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
