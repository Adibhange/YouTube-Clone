import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import RecommendedVideo from "../components/RecommendedVideo";
import { useEffect, useState } from "react";
import VideoComment from "../components/VideoComment";
import axios from "./../../axios.config";
import { PublishedAt } from "../components/PublishedAt";
import { toast } from "react-toastify";

const VideoDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [video, setVideo] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/${id}`,
        );
        setVideo(res.data.video);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    const fetchAllVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/video`,
        );
        setAllVideos(res.data.videos);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchVideo();
    fetchAllVideos();
  }, [id]);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  // Filter out the current video from the list of all videos
  const recommendedVideos = allVideos.filter((v) => v._id !== id);

  return (
    <div className="flex flex-col gap-4 px-6 py-4 md:px-12 lg:flex-row">
      {video && (
        <div className="flex-1 space-y-4">
          {/* Main Video Section */}
          <VideoPlayer video={video} />

          {/* Video Description */}
          <div className="space-y-2 rounded-lg bg-foreground px-4 py-2">
            <div className="flex gap-2 text-sm text-copy-light">
              <p>{video.views} views</p>
              <p>
                <PublishedAt createdAt={video.createdAt} />
              </p>
            </div>
            <div className="text-sm text-copy">
              <p
                className={`${isExpanded ? "" : "line-clamp-2"} transition-all duration-500`}
              >
                {video.description}
              </p>
              <p
                onClick={toggleDescription}
                className="mt-1 cursor-pointer text-end text-sm font-medium text-blue-500 hover:underline"
              >
                {isExpanded ? "Show less" : "Show more"}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <VideoComment />
        </div>
      )}

      {/* Sidebar: Recommended Videos */}
      <aside className="w-full space-y-2 lg:w-1/3">
        <h2 className="text-lg font-semibold sm:text-xl">Recommended Videos</h2>
        <div>
          {recommendedVideos.length === 0 ? (
            <p className="text-center text-sm text-copy">No videos found</p>
          ) : (
            recommendedVideos.map((recommendedVideo) => (
              <RecommendedVideo
                key={recommendedVideo._id}
                video={recommendedVideo}
              />
            ))
          )}
        </div>
      </aside>
    </div>
  );
};

export default VideoDetails;
