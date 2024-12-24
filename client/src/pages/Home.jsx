import { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import VideoItem from "../components/VideoItem";
import { useSelector } from "react-redux";
import axios from "./../../axios.config";
import { categories } from "../utils/categoryData";
import { BackwardArrowIcon, ForwardArrowIcon } from "../utils/icons";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const categoryContainerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/video`,
        );

        setVideos(res.data.videos || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  // Scroll categories with buttons
  const scrollCategories = (direction) => {
    if (categoryContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      categoryContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <section className="h-[calc(100vh-4rem)] flex-1 overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
        {/* Categories with Buttons */}
        <div className="relative px-8 pt-4">
          <button
            className="absolute left-0 top-9 -translate-y-1/2 rounded-full p-2 transition-all duration-300 hover:bg-foreground"
            onClick={() => scrollCategories("left")}
          >
            <BackwardArrowIcon />
          </button>
          <div
            ref={categoryContainerRef}
            className="flex gap-2 overflow-hidden"
          >
            {categories.map((category) => (
              <div key={category} className="flex-shrink-0">
                <p className="whitespace-nowrap rounded-lg bg-foreground p-2">
                  {category}
                </p>
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 top-9 -translate-y-1/2 rounded-full p-2 transition-all duration-300 hover:bg-foreground"
            onClick={() => scrollCategories("right")}
          >
            <ForwardArrowIcon />
          </button>
        </div>

        {/* Videos */}
        {videos.length > 0 ? (
          <div
            className={`grid ${
              isSidebarOpen ? "grid-cols-3" : "grid-cols-4"
            } gap-4 p-8`}
          >
            {videos.map((video) => (
              <VideoItem key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-copy-light">No videos found</p>
        )}
      </section>
    </div>
  );
};

export default Home;
