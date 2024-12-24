import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { SearchIcon, VerticalThreeDotIcon } from "../utils/icons";
import { useEffect, useState } from "react";
import axios from "./../../axios.config";
import { PublishedAt } from "../components/PublishedAt";

const ChannelDetails = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/channel/${id}`,
      );
      setChannel(res.data.channel);
      setVideos(res.data.channel.videos);
    };
    fetchChannel();
  }, []);

  // console.log(channel);
  // console.log(videos);

  return (
    <div className="flex">
      <SideBar />
      {channel && (
        <section className="flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
          <div className="px-16 py-2">
            <img
              src={channel.channelBanner}
              alt={channel.channelName}
              className="h-40 w-full rounded-lg object-fill"
            />
          </div>

          <div className="flex gap-4 px-16 pb-2 pt-4">
            <img
              src={channel.channelAvatar}
              alt={channel.channelName}
              className="h-36 w-36 rounded-full"
            />
            <div className="flex flex-col items-start gap-2">
              <p className="text-3xl font-bold">{channel.channelName}</p>
              <p className="text-copy-lighter">
                {channel.subscribers} subscibers • {channel.videos.length}{" "}
                videos
              </p>
              <p className="text-copy-lighter">
                I make quality content for you
              </p>
              <button className="rounded-full bg-copy px-4 py-2 text-black hover:bg-copy-light">
                Subscribe
              </button>
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
                <article className="flex flex-col gap-2">
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
                      <Link
                        to={`/channel/${video.channel._id}`}
                        className="text-sm text-copy-light hover:text-copy"
                      >
                        {video.channel.channelName}
                      </Link>
                      {/* Views and Published Date */}
                      <p className="text-sm text-copy-lighter">
                        {video.views} •{" "}
                        <PublishedAt createdAt={video.createdAt} />
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
      )}
    </div>
  );
};

export default ChannelDetails;
