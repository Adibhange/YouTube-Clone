import { useSelector } from "react-redux";
import { SearchIcon, VerticalThreeDotIcon } from "../utils/icons";
import { PublishedAt } from "./PublishedAt";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ChannelItems = ({ channel, videos }) => {
  const [owner, setOwner] = useState(true);
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && channel && currentUser.userData._id === channel.Owner) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [currentUser, channel]);

  console.log(currentUser);

  return (
    <section className="flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
      <div className="px-16 py-2">
        <img
          src={channel.channelBanner}
          alt={channel.channelName}
          className="h-40 w-full rounded-lg object-fill"
        />
      </div>

      <div className="flex w-full gap-4 px-16 pb-2 pt-4">
        <img
          src={channel.channelAvatar}
          alt={channel.channelName}
          className="h-36 w-36 rounded-full"
        />
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full gap-8">
            <p className="text-3xl font-bold">{channel.channelName}</p>
            {owner && (
              <button className="rounded-md border-2 border-border px-4 py-1 hover:bg-foreground">
                <Link to="/edit-channel">Edit Channel</Link>
              </button>
            )}
          </div>
          <p className="text-copy-lighter">
            {channel.subscribers} subscibers • {channel.videos.length} videos
          </p>
          <p className="text-copy-lighter">I make quality content for you</p>

          {owner || (
            <button className="rounded-full bg-copy px-4 py-2 text-black hover:bg-copy-light">
              Subscribe
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6 px-16 py-2">
        <p className="cursor-not-allowed text-copy-light">Home</p>
        <p className="cursor-pointer text-copy transition hover:text-copy">
          Videos
        </p>
        <p className="cursor-not-allowed text-copy-light">Shorts</p>
        <p className="cursor-not-allowed text-copy-light">Live</p>
        <p className="cursor-not-allowed text-copy-light">Podcasts</p>
        <p className="cursor-not-allowed text-copy-light">Playlists</p>
        <p className="cursor-not-allowed text-copy-light">Community</p>
        <p className="cursor-not-allowed text-copy-light">
          <SearchIcon />
        </p>
      </div>

      <hr className="border-2 border-border" />

      {videos.length > 0 ? (
        <div
          className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} container mx-auto w-[90%] gap-4 py-4`}
        >
          {videos.map((video) => (
            <article key={video._id} className="flex flex-col gap-2">
              {/* Thumbnail Section */}
              <div className="group relative">
                <Link to={`/video/${video._id}`}>
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
                {/* Details */}
                <div className="flex w-full flex-col gap-1">
                  <div className="flex justify-between">
                    {/* Title */}
                    <Link
                      to={`/video/${video._id}`}
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
                  <p className="text-sm text-copy-light hover:text-copy">
                    {video.channel.channelName}
                  </p>
                  {/* Views and Published Date */}
                  <p className="text-sm text-copy-lighter">
                    {video.views} • <PublishedAt createdAt={video.createdAt} />
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center">No videos found</p>
      )}
    </section>
  );
};

export default ChannelItems;
