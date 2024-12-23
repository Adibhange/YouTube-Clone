import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
	{
		channelName: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		channelBanner: {
			type: String,
			required: true,
		},
		channelAvatar: {
			type: String,
			required: true,
		},
		videos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Video",
			},
		],
		subscribers: {
			type: String,
		},
		Owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
