import { Link } from "react-router-dom";
import {
  DislikeVideoIcon,
  DownloadIcon,
  HorizontalThreeDotIcon,
  LikeVideoIcon,
  ShareIcon,
} from "../utils/icons";
import { useSelector } from "react-redux";
import axios from "./../../axios.config";
import { useState, useEffect } from "react";

const VideoPlayer = ({ video }) => {
  const { currentUser } = useSelector((state) => state.user);

  // Local state to manage like status and count
  const [liked, setLiked] = useState(
    currentUser?.userData.likedVideos.includes(video._id),
  );
  const [likeCount, setLikeCount] = useState(video.likeCount);

  const handleLike = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/update/likes/${video._id}`,
        currentUser.userData,
        {
          headers: {
            Authorization: `JWT ${currentUser.token}`,
          },
        },
      );

      // Update local state based on the response
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Failed to update like status", error);
    }
  };

  useEffect(() => {
    // Synchronize the like status and count with the user state on mount
    if (currentUser?.userData.likedVideos.includes(video._id)) {
      setLiked(true);
    }
  }, [currentUser, video._id]);

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <video
        title={video.title}
        className="h-full w-full rounded-lg"
        controls
        autoPlay
      >
        <source src={video.videoFile} type="video/mp4" />
      </video>

      <p className="text-lg font-semibold sm:text-xl">{video.title}</p>

      {/* Video Info */}
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* Channel Info */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to={`/channel/${video.channel.channelName}`}>
              <img
                src={video.channel.channelAvatar}
                alt={video.channel.channelName}
                className="size-10 rounded-full sm:size-12"
              />
            </Link>

            <div>
              <Link to={`/channel/${video.channel._id}`}>
                <p className="font-medium">{video.channel.channelName}</p>
              </Link>

              <p className="text-sm text-copy-lighter">1.4k subscribers</p>
            </div>
            <button className="ml-auto rounded-full bg-copy px-4 py-2 text-black hover:bg-copy-light">
              Subscribe
            </button>
          </div>

          {/* Actions: Like, Dislike, Share, etc. */}
          <div className="flex gap-2 text-sm">
            {/* Like/Dislike */}
            <div className="flex items-center gap-4 rounded-full bg-foreground px-4 py-2">
              <button
                className="flex items-center gap-1 text-copy-light transition hover:text-copy"
                onClick={handleLike}
              >
                <LikeVideoIcon />
                <span>{likeCount}</span>
              </button>
              {/* Vertical Line Separator */}
              <span className="h-6 border-l-2 border-border"></span>
              <button className="text-copy-light transition hover:text-copy">
                <DislikeVideoIcon />
              </button>
            </div>

            {/* Other Actions */}
            <div className="flex items-center gap-2">
              <button className="hidden items-center gap-1 rounded-full bg-foreground px-4 py-2 text-copy-light transition hover:text-copy sm:flex">
                <ShareIcon /> <span>Share</span>
              </button>
              <button className="hidden items-center gap-1 rounded-full bg-foreground px-4 py-2 text-copy-light transition hover:text-copy sm:flex">
                <DownloadIcon /> <span>Download</span>
              </button>
              <button className="rounded-full bg-foreground p-2 text-copy-light transition hover:text-copy">
                <HorizontalThreeDotIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
