import { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import VideoItem from "../components/VideoItem";
import { useSelector } from "react-redux";
import axios from "./../../axios.config";
import { categories } from "../utils/categoryData";
import { BackwardArrowIcon, ForwardArrowIcon } from "../utils/icons";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categoryContainerRef = useRef(null);

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  // Fetch videos based on selected category
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const endpoint =
          selectedCategory === "All"
            ? `${import.meta.env.VITE_REACT_APP_BASE_URL}/video`
            : `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/category/${selectedCategory}`;
        const res = await axios.get(endpoint);
        setVideos(res.data.videos || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [selectedCategory]);

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
            {["All", ...categories].map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap rounded-lg p-2 ${
                  selectedCategory === category
                    ? "text-copy ring-1 ring-border"
                    : "bg-foreground text-copy-light"
                } transition-all duration-300`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
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
          <p className="mt-4 text-center text-xl text-copy-light">
            No videos found
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
