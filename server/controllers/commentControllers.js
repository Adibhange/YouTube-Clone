import Comment from "../models/commentModel.js";
import HttpError from "../models/errorModel.js";
import Video from "../models/videoModel.js";

/**
 *  Add Comment
 *  POST /api/comment/add/:videoId
 */
export const addComment = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required", 401));
		}

		const { videoId } = req.params;
		const { comment } = req.body;

		if (!comment) {
			return next(new HttpError("Comment is required", 400));
		}

		const video = await Video.findById(videoId);

		const newComment = await Comment.create({
			comment,
			user: req.user.userId,
			video: videoId,
		});

		video.comments.push(newComment);
		await video.save();

		res.status(200).json({
			message: "Comment added",
			comment: newComment,
		});
	} catch (error) {
		return next(new HttpError("Comment adding failed", 400));
	}
};

/**
 * Get Comments of a Video
 * GET /api/comment/:videoId
 */
export const getCommentsOfVideo = async (req, res, next) => {
	try {
		const { videoId } = req.params;

		const comments = await Comment.find({ video: videoId });

		if (!comments) {
			return next(new HttpError("No comments found", 404));
		}

		res.status(200).json({
			message: "Comment fetched successfully",
			comments,
		});
	} catch (error) {
		return next(new HttpError("Comment fetching failed", 400));
	}
};

/**
 *  Edit Comment
 *  PATCH /api/comment/edit/:videoId
 */
export const editComment = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required", 401));
		}

		const { videoId } = req.params;
		const { commentId, comment } = req.body;

		if (!commentId || !comment) {
			return next(
				new HttpError("Comment ID and comment text are required", 400)
			);
		}

		// Find the comment by its ID
		const commentToEdit = await Comment.findById(commentId);
		if (!commentToEdit) {
			return next(new HttpError("Comment not found", 404));
		}

		// Check if the user is the owner of the comment
		if (commentToEdit.user.toString() !== req.user.userId.toString()) {
			return next(new HttpError("You can't edit this comment", 403));
		}

		// Update the comment text
		const updatedComment = await Comment.findByIdAndUpdate(
			commentId,
			{ comment }, // Ensure we update only the `comment` field
			{ new: true }
		);

		res.status(200).json({
			message: "Comment updated successfully",
			comment: updatedComment,
		});
	} catch (error) {
		return next(new HttpError("Comment editing failed", 400));
	}
};

/**
 *  Delete Video
 *  DELETE /api/comment/delete/:videoId
 */
export const deleteComment = async (req, res, next) => {
	try {
		if (!req.user) {
			return next(new HttpError("Sign in required", 401));
		}

		const { videoId } = req.params;
		const { commentId } = req.body;

		const comment = await Comment.findById(commentId);
		if (!comment) {
			return next(new HttpError("Comment not found", 404));
		}

		// Check if the user is the owner of the comment
		if (comment.user.toString() !== req.user.userId.toString()) {
			return next(new HttpError("You can't delete this comment", 403));
		}

		// Delete the comment
		await Comment.findByIdAndDelete(commentId);

		// Delete the comment from the video
		const video = await Video.findById(videoId);
		video.comments = video.comments.filter((id) => id != commentId);
		await video.save();

		res.status(200).json({
			message: "Comment deleted successfully",
		});
	} catch (error) {
		return next(new HttpError("Comment deleting failed", 400));
	}
};
