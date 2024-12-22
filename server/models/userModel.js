import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		userAvatar: {
			type: String,
			required: true,
		},
		// As user can have only one channel
		channel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Channel",
			unique: true,
		},
		Comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		likedVideos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Video",
			},
		],
		subscribedChannels: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Channel",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
