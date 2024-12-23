import express from "express";
import { uploadVideo } from "../controllers/videoControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/upload", authMiddleware, uploadVideo);

export default router;
