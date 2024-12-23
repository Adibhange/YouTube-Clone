import Channel from "../models/channelModel.js";
import HttpError from "../models/errorModel.js";
import Video from "../models/videoModel.js";
import formatNumber from "../utils/formatNumber.js";

/**
 *  Upload Video
 *  POST /api/video/upload
 */
export const uploadVideo = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required to upload video", 401));
		}

		const channel = await Channel.findOne({ Owner: req.user.userId });
		if (!channel) {
			return next(new HttpError("You don't have any channel", 404));
		}

		const { title, description, thumbnail, duration, videoFile, category } =
			req.body;

		if (
			!title ||
			!description ||
			!thumbnail ||
			!duration ||
			!videoFile ||
			!category
		) {
			return next(new HttpError("All fields are required", 400));
		}

		// Random views count
		const randomViews = Math.floor(Math.random() * 1000000) + 1;

		// Create new video
		const newVideo = await Video.create({
			title,
			description,
			thumbnail,
			duration,
			views: formatNumber(randomViews),
			category,
			videoFile,
			channel: channel._id,
		});

		// Update the channel with the new video
		channel.videos.push(newVideo._id);
		await channel.save();

		res.status(201).json({
			message: "Video uploaded successfully",
			video: newVideo,
		});
	} catch (error) {
		console.log(error);
		return next(new HttpError("Video upload failed", 400));
	}
};
