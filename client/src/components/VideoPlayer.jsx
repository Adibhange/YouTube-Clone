import { Link } from "react-router-dom";
import {
  DislikeVideoIcon,
  DownloadIcon,
  HorizontalThreeDotIcon,
  LikeVideoIcon,
  ShareIcon,
} from "../utils/icons";

const VideoPlayer = ({ video }) => {
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

      <p className="text-xl font-semibold">{video.title}</p>

      {/* Video Info */}
      <div>
        <div className="flex items-center justify-between">
          {/* Channel Info */}
          <div className="flex items-center gap-4">
            <Link to={`/channel/${video.channel.channelName}`}>
              <img
                src={video.channel.channelAvatar}
                alt={video.channel.channelName}
                className="h-12 w-12 rounded-full"
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
              <button className="flex items-center gap-1 text-copy-light transition hover:text-copy">
                <LikeVideoIcon /> <span>{video.likeCount}</span>
              </button>
              {/* Vertical Line Separator */}
              <span className="h-6 border-l-2 border-border"></span>
              <button className="text-copy-light transition hover:text-copy">
                <DislikeVideoIcon />
              </button>
            </div>

            {/* Other Actions */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-copy-light transition hover:text-copy">
                <ShareIcon /> <span>Share</span>
              </button>
              <button className="flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-copy-light transition hover:text-copy">
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
