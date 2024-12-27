import { useEffect, useState } from "react";
import axios from "./../../axios.config";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { PublishedAt } from "../components/PublishedAt";
import { VerticalThreeDotIcon } from "../utils/icons";

const SearchedVideo = () => {
  const [videos, setVideos] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const fetchSearchedVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/search/${query}`,
        );
        setVideos(res.data.videos || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (query) {
      fetchSearchedVideos();
    }
  }, [query]);

  return (
    <div className="flex">
      <SideBar />
      <section className="flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
        {videos.length > 0 ? (
          <div className="flex cursor-pointer flex-col gap-3">
            {videos.map((video) => (
              <div className="mx-auto flex w-[90%] items-start gap-3 rounded-lg p-2 transition duration-200 ease-in-out hover:bg-foreground">
                {/* Video Thumbnail */}
                <div className="h-72 w-2/5 flex-shrink-0">
                  <Link to={`/video/${video._id}`}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </Link>
                </div>

                {/* Video Info */}
                <div className="flex flex-grow flex-col justify-center gap-2">
                  <Link to={`/video/${video._id}`}>
                    <p className="text-xl font-semibold text-copy">
                      {video.title}
                    </p>
                  </Link>

                  <p className="text-xs text-copy-lighter">
                    {video.views} • <PublishedAt createdAt={video.createdAt} />
                  </p>

                  <div className="flex items-center gap-2">
                    <img
                      src={video.channel.channelAvatar}
                      alt={video.channel.channelName}
                      className="h-8 w-8 rounded-full"
                    />
                    <Link to={`/channel/${video.channel._id}`}>
                      <p className="text-lg text-copy-light">
                        {video.channel.channelName}
                      </p>
                    </Link>
                  </div>

                  <p className="line-clamp-1 text-xs text-copy-lighter">
                    {video.description}
                  </p>
                </div>

                <VerticalThreeDotIcon
                  className="ml-auto cursor-pointer"
                  size="32"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No videos found for "{query}"</p>
        )}
      </section>
    </div>
  );
};

export default SearchedVideo;
