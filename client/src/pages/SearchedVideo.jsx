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
      <section className="h-[calc(100vh-4rem)] flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
        {videos.length > 0 ? (
          <div className="flex flex-col gap-4">
            {videos.map((video) => (
              <div
                key={video._id}
                className="mx-auto flex flex-col items-start gap-4 rounded-lg p-2 transition duration-200 ease-in-out hover:bg-foreground lg:w-[95%] lg:flex-row"
              >
                {/* Video Thumbnail */}
                <div className="h-48 w-full flex-shrink-0 lg:h-56 lg:w-2/5">
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
                  <div className="flex">
                    <Link to={`/video/${video._id}`}>
                      <p className="text-base font-semibold text-copy md:text-lg lg:text-xl">
                        {video.title}
                      </p>
                    </Link>

                    <button className="ml-auto lg:hidden">
                      <VerticalThreeDotIcon />
                    </button>
                  </div>

                  <p className="text-xs text-copy-lighter md:text-sm">
                    {video.views} views •{" "}
                    <PublishedAt createdAt={video.createdAt} />
                  </p>

                  <div className="flex items-center gap-2">
                    <img
                      src={video.channel.channelAvatar}
                      alt={video.channel.channelName}
                      className="h-8 w-8 rounded-full"
                    />
                    <Link to={`/channel/${video.channel._id}`}>
                      <p className="text-sm text-copy-light md:text-base">
                        {video.channel.channelName}
                      </p>
                    </Link>
                  </div>

                  <p className="line-clamp-2 text-xs text-copy-lighter md:line-clamp-3">
                    {video.description}
                  </p>
                </div>

                <button className="hidden lg:ml-auto lg:block">
                  <VerticalThreeDotIcon />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg lg:text-xl">
            No videos found for "{query}"
          </p>
        )}
      </section>
    </div>
  );
};

export default SearchedVideo;
