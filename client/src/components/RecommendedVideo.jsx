import { Link } from "react-router-dom";
import { VerticalThreeDotIcon } from "../utils/icons";
import { PublishedAt } from "./PublishedAt";

const RecommendedVideo = ({ video }) => {
  return (
    <div className="flex items-start gap-3 rounded-lg p-2 transition duration-200 ease-in-out hover:bg-foreground">
      {/* Video Thumbnail */}
      <div className="h-20 w-40 flex-shrink-0">
        <Link to={`/video/${video._id}`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full rounded-lg object-cover"
          />
        </Link>
      </div>

      {/* Video Info */}
      <div className="flex flex-grow flex-col justify-center gap-1">
        <Link to={`/video/${video._id}`}>
          <p className="text line-clamp-1 font-semibold text-copy">
            {video.title}
          </p>
        </Link>

        <Link to={`/channel/${video.channel._id}`}>
          <p className="text-sm text-copy-light">{video.channel.channelName}</p>
        </Link>
        <p className="text-xs text-copy-lighter">
          {video.views} • <PublishedAt createdAt={video.createdAt} />
        </p>
      </div>

      <VerticalThreeDotIcon className="ml-auto cursor-pointer text-copy-light" />
    </div>
  );
};

export default RecommendedVideo;
