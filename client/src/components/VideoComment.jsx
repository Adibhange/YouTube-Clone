import { useEffect, useRef, useState } from "react";
import { VerticalThreeDotIcon } from "../utils/icons";
import axios from "./../../axios.config";
import { useParams } from "react-router-dom";
import { PublishedAt } from "./PublishedAt";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VideoComment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [fetchComment, setFetchComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [openModalId, setOpenModalId] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const modalRef = useRef();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/comment/${id}`,
        );
        setComments(res.data.comments);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    if (fetchComment) {
      fetchComment();
      setFetchComment(false);
    }
  }, [id, fetchComment]);

  // console.log(comments);

  const handleModalToggle = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModalId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      if (!currentUser) {
        toast.warn("Sign in required to add comment");
        return;
      }
      try {
        // Post the new comment to the backend
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/comment/add/${id}`,
          { comment: commentText },
          {
            headers: {
              Authorization: `JWT ${currentUser.token}`,
            },
          },
        );

        // Fetch once again to get the updated list
        setFetchComment(true);
        toast.success(res.data.message);

        // Clear the comment input after posting
        setCommentText("");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.comment);
  };

  const handleSaveEdit = async () => {
    if (editingComment && commentText.trim()) {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/comment/edit/${id}`,
          {
            commentId: editingComment._id,
            comment: commentText,
          },
          {
            headers: {
              Authorization: `JWT ${currentUser.token}`,
            },
          },
        );

        // Fetch once again to get the updated list
        setFetchComment(true);

        setEditingComment(null);
        setCommentText("");
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/comment/delete/${id}`,
        {
          headers: {
            Authorization: `JWT ${currentUser.token}`,
          },
          data: {
            commentId: commentId,
          },
        },
      );

      // Fetch once again to get the updated list
      setFetchComment(true);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Comments Header */}
      <h2 className="text-lg font-semibold">{comments.length} Comments</h2>

      {/* Comment Input Box */}
      <div className="flex items-start gap-3">
        <img
          src={
            currentUser?.userData?.userAvatar ||
            "https://avatar.iran.liara.run/public/"
          }
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
            {editingComment ? (
              <button
                onClick={handleSaveEdit}
                className="rounded bg-blue-500 px-4 py-2 text-sm text-copy hover:bg-blue-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleAddComment}
                className="rounded bg-blue-500 px-4 py-2 text-sm text-copy hover:bg-blue-600"
              >
                Comment
              </button>
            )}
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
                className="size-8 rounded-full sm:size-10"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold sm:text-base">
                  {comment.user.userName}
                </p>
                <p className="text-xs text-copy-lighter sm:text-sm">
                  <PublishedAt createdAt={comment.createdAt} />
                </p>
                <p className="mt-1 text-sm sm:text-base">{comment.comment}</p>
              </div>

              {comment.user._id === currentUser?.userData._id ? (
                <div className="relative" ref={modalRef}>
                  <button
                    className="ml-auto text-copy-light"
                    onClick={() => handleModalToggle(comment._id)}
                  >
                    <VerticalThreeDotIcon />
                  </button>

                  {openModalId === comment._id && (
                    <div className="absolute right-0 top-6 z-50 flex w-20 flex-col items-start gap-2 rounded-lg bg-foreground">
                      <button
                        className="px-4 py-2 text-sm text-copy-light hover:text-copy"
                        onClick={() => handleEditComment(comment)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-4 py-2 text-sm text-copy-light hover:text-copy"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="ml-auto text-copy-light">
                  <VerticalThreeDotIcon />
                </button>
              )}
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
