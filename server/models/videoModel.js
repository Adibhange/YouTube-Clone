import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		likeCount: {
			type: Number,
			default: 0,
		},
		views: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: [
				"Programming",
				"Music",
				"Gaming",
				"News",
				"Fashion",
				"Movies",
				"Automotive",
				"Cooking",
				"Technology",
				"Travel",
				"Design",
				"Sports",
				"Podcasts",
				"Business",
				"Health",
				"Others",
			],
			required: true,
		},
		videoFile: {
			type: String,
			required: true,
		},
		publishedAt: {
			type: Date,
			default: Date.now(),
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		channel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Channel",
		},
	},
	{ timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
