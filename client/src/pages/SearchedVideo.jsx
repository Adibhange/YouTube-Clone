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
          <div className="flex cursor-pointer flex-col gap-4">
            {videos.map((video) => (
              <div
                key={video._id}
                className="mx-auto flex w-[95%] items-start gap-4 rounded-lg p-2 transition duration-200 ease-in-out hover:bg-foreground"
              >
                {/* Video Thumbnail */}
                <div className="h-48 flex-shrink-0 md:w-1/2 lg:h-72 lg:w-2/5">
                  <Link to={`/video/${video._id}`}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full rounded-lg"
                    />
                  </Link>
                </div>

                {/* Video Info */}
                <div className="flex flex-grow flex-col justify-center gap-2">
                  <Link to={`/video/${video._id}`}>
                    <p className="text-lg font-semibold text-copy md:text-xl">
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
                      className="size-8 rounded-full"
                    />
                    <Link to={`/channel/${video.channel._id}`}>
                      <p className="text-copy-light md:text-lg">
                        {video.channel.channelName}
                      </p>
                    </Link>
                  </div>

                  <p className="line-clamp-1 text-xs text-copy-lighter">
                    {video.description}
                  </p>
                </div>

                <button className="ml-auto">
                  <VerticalThreeDotIcon />
                </button>
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
