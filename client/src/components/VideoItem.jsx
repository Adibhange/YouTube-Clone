import { Link } from "react-router-dom";
import { VerticalThreeDotIcon } from "../utils/icons";

const VideoItem = ({ video }) => {
  return (
    <article className="flex flex-col gap-2">
      {/* Thumbnail Section */}
      <div className="group relative">
        <Link to={`/video/${video.id}`}>
          <img
            src={video.thumbnail}
            alt={`Thumbnail of ${video.title}`}
            className="w-full rounded-lg"
          />
        </Link>
        {/* Duration */}
        <p className="absolute bottom-2 right-2 z-10 rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
          {video.duration}
        </p>
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <Link to={`/channel/${video.channel}`} className="shrink-0">
          <img
            src={video.channelAvatar}
            alt={`Avatar of ${video.channel}`}
            className="h-10 w-10 rounded-full"
          />
        </Link>

        {/* Details */}
        <div className="flex w-full flex-col gap-1">
          <div className="flex justify-between">
            {/* Title */}
            <Link
              to={`/video/${video.id}`}
              className="line-clamp-2 font-medium"
            >
              {video.title}
            </Link>
            {/* More Options Icon */}
            <button
              className="text-copy-light hover:text-copy"
              aria-label="More options"
            >
              <VerticalThreeDotIcon />
            </button>
          </div>

          {/* Channel */}
          <Link
            to={`/channel/${video.channel}`}
            className="text-sm text-copy-light hover:text-copy"
          >
            {video.channel}
          </Link>
          {/* Views and Published Date */}
          <p className="text-xs text-copy-lighter">
            {video.views} • {video.published}
          </p>
        </div>
      </div>
    </article>
  );
};

export default VideoItem;
