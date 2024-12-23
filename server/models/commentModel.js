import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
		},
		video: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
