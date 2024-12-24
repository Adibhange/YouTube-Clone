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

/**
 *  Get All Video
 *  GET /api/video/
 */
export const getAllVideo = async (req, res, next) => {
	try {
		const videos = await Video.find({}).populate("channel");
		if (!videos) {
			return next(new HttpError("No videos found", 404));
		}
		res.status(200).json({
			message: "Video fetched successfully",
			videos,
		});
	} catch (error) {
		return next(new HttpError("Video fetching failed", 400));
	}
};

/**
 *  Get Video by Id
 *  GET /api/video/:videoId
 */
export const getVideoById = async (req, res, next) => {
	try {
		const { videoId } = req.params;
		const video = await Video.findById(videoId);
		if (!video) {
			return next(new HttpError("Video not found", 404));
		}
		res.status(200).json({
			message: "Video fetched successfully",
			video,
		});
	} catch (error) {
		return next(new HttpError("Video fetching failed", 400));
	}
};

/**
 *  Get Channel Video
 *  GET /api/video/channel/:channelId
 */
export const getChannelVideo = async (req, res, next) => {
	try {
		const { channelId } = req.params;

		const videos = await Video.find({ channel: channelId });
		if (!videos) {
			return next(new HttpError("No videos found", 404));
		}

		res.status(200).json({
			message: "Channel video fetched successfully",
			videos,
		});
	} catch (error) {
		return next(new HttpError("Channel video fetching failed", 400));
	}
};

/**
 *  Update Video
 *  PATCH /api/video/update/:videoId
 */
export const updateVideo = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required", 401));
		}

		const { videoId } = req.params;

		const video = await Video.findById(videoId).populate({
			path: "channel",
		});

		if (!video) {
			return next(new HttpError("Video not found", 404));
		}

		// console.log(video.channel);

		// Check if user is the owner of the video
		if (video.channel.Owner.toString() !== req.user.userId.toString()) {
			return next(new HttpError("You can't update this video", 403));
		}

		const { title, description, thumbnail, duration, videoFile, category } =
			req.body;

		if (
			!title &&
			!description &&
			!thumbnail &&
			!duration &&
			!videoFile &&
			!category
		) {
			return next(
				new HttpError("Minimum one field is required to update", 400)
			);
		}

		const updatedFields = {};

		if (title) updatedFields.title = title;
		if (description) updatedFields.description = description;
		if (thumbnail) updatedFields.thumbnail = thumbnail;
		if (duration) updatedFields.duration = duration;
		if (videoFile) updatedFields.videoFile = videoFile;
		if (category) updatedFields.category = category;

		// Update video
		const updatedVideo = await Video.findByIdAndUpdate(videoId, updatedFields, {
			new: true,
		});

		res.status(200).json({
			message: "Video updated successfully",
			video: updatedVideo,
		});
	} catch (error) {
		return next(new HttpError("Video updating failed", 400));
	}
};

/**
 *  Delete Video
 *  DELETE /api/video/delete/:videoId
 */
export const deleteVideo = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required", 401));
		}

		const { videoId } = req.params;

		const video = await Video.findById(videoId);
		if (!video) {
			return next(new HttpError("Video not found", 404));
		}

		// Check if user is the owner of the video
		if (video.Owner.toString() !== req.user.userId.toString()) {
			return next(new HttpError("You can't delete this video", 403));
		}

		// Delete video
		await Video.findByIdAndDelete(videoId);

		// Delete video from channel
		const channel = await Channel.findById(video.channel);
		channel.videos = channel.videos.filter((id) => id != videoId);
		await channel.save();

		res.status(200).json({
			message: "Video deleted successfully",
		});
	} catch (error) {
		return next(new HttpError("Video deleting failed", 400));
	}
};
