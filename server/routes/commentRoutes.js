import express from "express";
import {
	addComment,
	deleteComment,
	editComment,
	getCommentsOfVideo,
} from "../controllers/commentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add/:videoId", authMiddleware, addComment);
router.get("/:videoId", getCommentsOfVideo);
router.patch("/edit/:videoId", authMiddleware, editComment);
router.delete("/delete/:videoId", authMiddleware, deleteComment);

export default router;
