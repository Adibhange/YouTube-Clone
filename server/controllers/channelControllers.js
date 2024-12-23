import Channel from "../models/channelModel.js";
import HttpError from "../models/errorModel.js";

/**
 *  Create New Channel
 *  POST /api/channel/create
 */
export const createChannel = async (req, res, next) => {
	try {
		// Check user is sign in
		if (!req.user) {
			return next(new HttpError("Sign in required to create channel", 401));
		}
		// console.log(req.user);

		// Check if the user already owns a channel
		const existingChannel = await Channel.findOne({ Owner: req.user.userId });
		if (existingChannel) {
			return next(new HttpError("You already have a channel", 403));
		}

		const { channelName, description, channelBanner, category, channelAvatar } =
			req.body;

		if (
			!channelName ||
			!description ||
			!channelBanner ||
			!category ||
			!channelAvatar
		) {
			return next(new HttpError("All fields are required", 400));
		}

		// check if channel name already exists
		const channelNameExists = await Channel.findOne({
			channelName: channelName.toLowerCase(),
		});
		if (channelNameExists) {
			return next(new HttpError("This channel name already exists", 422));
		}

		// Add Random subscribers to channel
		const randomSubscribers = Math.floor(Math.random() * 1000000) + 1;

		// Format subscribers number in M and K
		const formatSubscribers = (num) => {
			if (num >= 1000000) {
				return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
			} else if (num >= 1000) {
				return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
			} else {
				return num.toString();
			}
		};

		// Create new channel
		const newChannel = await Channel.create({
			channelName: channelName.toLowerCase(),
			description,
			channelBanner,
			category,
			channelAvatar,
			subscribers: formatSubscribers(randomSubscribers),
			Owner: req.user.userId,
		});

		res.status(201).json({
			message: "Channel created successfully",
			channel: newChannel,
		});
	} catch (error) {
		return next(new HttpError("Channel creation failed", 400));
	}
};

/**
 *  Get SignIn User Channels
 *  GET /api/channel/my-channel
 */
export const getUserChannel = async (req, res, next) => {
	try {
		// Check user is sign in
		if (!req.user) {
			return next(new HttpError("Sign in required to create channel", 401));
		}

		const channel = await Channel.findOne({ Owner: req.user.userId });
		if (!channel) {
			return next(new HttpError("You don't have any channel", 404));
		}

		res.status(200).json({
			message: "Channel fetched successfully",
			channel,
		});
	} catch (error) {
		return next(new HttpError("Channel fetching failed", 400));
	}
};

/**
 *  Get Single Channel
 *  GET /api/channel/:channelId
 */
export const getChannel = async (req, res, next) => {
	try {
		const { channelId } = req.params;

		// Check if channel exists
		const channel = await Channel.findById(channelId);
		if (!channel) {
			return next(new HttpError("Channel not found", 404));
		}

		res.status(200).json({
			message: "Channel fetched successfully",
			channel,
		});
	} catch (error) {
		return next(new HttpError("Channel fetching failed", 400));
	}
};

/**
 *  Update Channel
 *  PATCH /api/channel/update
 */
export const updateChannel = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required to edit channel", 401));
		}

		const channel = await Channel.findOne({ Owner: req.user.userId });
		if (!channel) {
			return next(new HttpError("You don't have any channel", 404));
		}

		const { channelBanner, channelAvatar, description } = req.body;

		// Dynamically update only the fields provided
		const updatedFields = {};

		if (description) updatedFields.description = description;
		if (channelBanner) updatedFields.channelBanner = channelBanner;
		if (channelAvatar) updatedFields.channelAvatar = channelAvatar;

		// Update channel banner
		const updatedChannel = await Channel.findOneAndUpdate(
			{ Owner: req.user.userId },
			updatedFields,
			{ new: true }
		);

		res.status(200).json({
			message: "Channel updated successfully",
			channel: updatedChannel,
		});
	} catch (error) {
		return next(new HttpError("Channel updating failed", 400));
	}
};
