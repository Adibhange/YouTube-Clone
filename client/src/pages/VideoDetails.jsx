import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import RecommendedVideo from "../components/RecommendedVideo";

const VideoDetails = () => {
  const dummyVideos = [
    {
      id: 1,
      title: "How to Build a YouTube Clone with React",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "React Developer",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1.2M views",
      published: "2 days ago",
      duration: "12:35",
      category: "Programming",
    },
    {
      id: 2,
      title: "Top 10 Trending Music Videos",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Music Vibes",
      channelAvatar: "https://via.placeholder.com/40",
      views: "500K views",
      published: "1 week ago",
      duration: "6:20",
      category: "Music",
    },
    {
      id: 3,
      title: "Gaming Highlights: Best Moments",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Game Masters",
      channelAvatar: "https://via.placeholder.com/40",
      views: "3M views",
      published: "3 days ago",
      duration: "10:00",
      category: "Gaming",
    },
    {
      id: 4,
      title: "News Update: Latest Headlines",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "News Network",
      channelAvatar: "https://via.placeholder.com/40",
      views: "200K views",
      published: "4 hours ago",
      duration: "5:50",
      category: "News",
    },
    {
      id: 5,
      title: "Best Fashion Trends of 2024",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Fashionista",
      channelAvatar: "https://via.placeholder.com/40",
      views: "900K views",
      published: "1 day ago",
      duration: "8:30",
      category: "Fashion",
    },
    {
      id: 6,
      title: "Latest Movies You Can't Miss",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Movie Buffs",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1.1M views",
      published: "2 weeks ago",
      duration: "15:00",
      category: "Movies",
    },
    {
      id: 7,
      title: "React Hooks Explained",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Web Dev Simplified",
      channelAvatar: "https://via.placeholder.com/40",
      views: "850K views",
      published: "1 month ago",
      duration: "13:10",
      category: "Programming",
    },
    {
      id: 8,
      title: "Top 5 Car Mods You Need to Try",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Car Enthusiasts",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1.5M views",
      published: "1 week ago",
      duration: "7:30",
      category: "Automotive",
    },
    {
      id: 9,
      title: "How to Make a Perfect Pizza",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Cooking with Chef John",
      channelAvatar: "https://via.placeholder.com/40",
      views: "600K views",
      published: "2 days ago",
      duration: "5:00",
      category: "Cooking",
    },
    {
      id: 10,
      title: "Python vs JavaScript: Which One Should You Learn?",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Programming Expert",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1.8M views",
      published: "3 months ago",
      duration: "14:40",
      category: "Programming",
    },
    {
      id: 11,
      title: "The Future of AI and Automation",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Tech Insights",
      channelAvatar: "https://via.placeholder.com/40",
      views: "2.3M views",
      published: "5 days ago",
      duration: "20:00",
      category: "Technology",
    },
    {
      id: 12,
      title: "Top 5 Places to Visit in Europe",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "Travel Vibes",
      channelAvatar: "https://via.placeholder.com/40",
      views: "750K views",
      published: "2 weeks ago",
      duration: "9:15",
      category: "Travel",
    },
    {
      id: 13,
      title: "Advanced JavaScript Tutorial",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "DevMaster",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1M views",
      published: "1 month ago",
      duration: "18:30",
      category: "Programming",
    },
    {
      id: 14,
      title: "How to Create Beautiful UI Designs",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "UI/UX Mastery",
      channelAvatar: "https://via.placeholder.com/40",
      views: "950K views",
      published: "2 days ago",
      duration: "12:25",
      category: "Design",
    },
    {
      id: 15,
      title: "Understanding Cloud Computing",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "TechWorld",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1.4M views",
      published: "1 week ago",
      duration: "10:10",
      category: "Technology",
    },
  ];
  const { id } = useParams();
  const video = dummyVideos.find((video) => video.id == id);

  return (
    <div className="video-details-page flex flex-col gap-4 px-12 py-4 lg:flex-row">
      {/* Main Video Section */}
      <div className="flex-1">
        <VideoPlayer video={video} />
      </div>

      {/* Sidebar: Recommended Videos */}
      <aside className="w-full space-y-2 lg:w-1/3">
        <h2 className="text-lg font-semibold">Recommended Videos</h2>
        <div className="">
          {dummyVideos
            .filter((v) => v.id != id)
            .map((recommendedVideo) => (
              <RecommendedVideo
                key={recommendedVideo.id}
                video={recommendedVideo}
              />
            ))}
        </div>
      </aside>
    </div>
  );
};

export default VideoDetails;
