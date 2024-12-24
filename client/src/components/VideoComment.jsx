import { useEffect, useState } from "react";
import { VerticalThreeDotIcon } from "../utils/icons";
import axios from "./../../axios.config";
import { useParams } from "react-router-dom";
import { PublishedAt } from "./PublishedAt";

const VideoComment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/comment/${id}`,
        );
        setComments(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [id]);

  // console.log(comments);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      try {
        // Post the new comment to the backend
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/comment/${id}`,
          { text: commentText },
        );

        // Add the new comment to the state (or refetch comments to get the updated list)
        setComments((prevComments) => [
          ...prevComments,
          {
            _id: res.data.comment._id,
            comment: commentText,
          },
        ]);

        // Clear the comment input after posting
        setCommentText("");
      } catch (error) {
        console.log("Failed to add comment:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Comments Header */}
      <h2 className="text-lg font-semibold">{comments.length} Comments</h2>

      {/* Comment Input Box */}
      <div className="flex items-start gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full resize-none rounded-lg border border-border bg-foreground p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="3"
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleAddComment}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-copy hover:bg-blue-600"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* List of Comments */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-3">
              <img
                src={comment.user.userAvatar}
                alt={`${comment.user.userName}'s Avatar`}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{comment.user.userName}</p>
                <p className="text-sm text-copy-lighter">
                  <PublishedAt createdAt={comment.createdAt} />
                </p>
                <p className="mt-1">{comment.comment}</p>
              </div>
              <div className="ml-auto cursor-pointer text-copy-light">
                <VerticalThreeDotIcon />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-copy">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoComment;
