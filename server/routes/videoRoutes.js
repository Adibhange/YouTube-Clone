import express from "express";
import {
	deleteVideo,
	getAllVideo,
	getChannelVideo,
	getVideoByCategory,
	getVideoById,
	getVideoBySearch,
	updateVideo,
	uploadVideo,
} from "../controllers/videoControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/upload", authMiddleware, uploadVideo);
router.get("/", getAllVideo);
router.get("/:videoId", getVideoById);
router.get("/category/:category", getVideoByCategory);
router.get("/search/:query", getVideoBySearch);
router.get("/channel/:channelId", getChannelVideo);
router.patch("/update/:videoId", authMiddleware, updateVideo);
router.delete("/delete/:videoId", authMiddleware, deleteVideo);

export default router;
