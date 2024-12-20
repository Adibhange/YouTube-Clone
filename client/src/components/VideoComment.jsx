import { useState } from "react";
import { VerticalThreeDotIcon } from "../utils/icons";

const VideoComment = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          username: "User",
          avatar: "https://via.placeholder.com/40",
          text: commentText,
          time: "Just now",
        },
      ]);
      setCommentText("");
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
            <div key={comment.id} className="flex items-start gap-3">
              <img
                src={comment.avatar}
                alt={`${comment.username}'s Avatar`}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{comment.username}</p>
                <p className="text-sm text-copy-lighter">{comment.time}</p>
                <p className="mt-1">{comment.text}</p>
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
