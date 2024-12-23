import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
	createChannel,
	getChannel,
	getUserChannel,
	updateChannel,
} from "../controllers/channelControllers.js";
const router = express.Router();

router.post("/create", authMiddleware, createChannel);
router.get("/my-channel", authMiddleware, getUserChannel);
router.get("/:channelId", getChannel);
router.patch("/update", authMiddleware, updateChannel);

export default router;
