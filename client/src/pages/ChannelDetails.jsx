import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import { SearchIcon } from "../utils/icons";
import VideoItem from "../components/VideoItem";

const ChannelDetails = () => {
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
    {
      id: 16,
      title: "How to Build a Spotify Clone with React",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "React Developer",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1M views",
      published: "4 days ago",
      duration: "15:35",
      category: "Programming",
    },
    {
      id: 17,
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
      id: 18,
      title: "How to Build a YouTube Clone with React",
      thumbnail: "https://via.placeholder.com/400x225",
      channel: "React Developer",
      channelAvatar: "https://via.placeholder.com/40",
      views: "1.2M views",
      published: "2 days ago",
      duration: "12:35",
      category: "Programming",
    },
  ];

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const channelName = useParams().id;

  const channelInfo = dummyVideos.find((video) => video.channel == channelName);
  const videos = dummyVideos.filter((video) => video.channel == channelName);

  return (
    <div className="flex">
      <SideBar />
      <section className="scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-y-auto p-4">
        <div className="px-16 py-2">
          <img
            src="https://img.lovepik.com/background/20211021/large/lovepik-banner-background-image_500457144.jpg"
            alt=""
            className="h-40 w-full rounded-lg object-fill"
          />
        </div>

        <div className="flex gap-4 px-16 pb-2 pt-4">
          <img
            src={channelInfo.channelAvatar}
            alt={channelInfo.channel}
            className="h-36 w-36 rounded-full"
          />
          <div className="flex flex-col items-start gap-2">
            <p className="text-3xl font-bold">{channelInfo.channel}</p>
            <p className="text-copy-lighter">5.24M subscibers • 1.5k videos</p>
            <p className="text-copy-lighter">I make quality content for you</p>
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

        <hr className="border-border" />

        {videos.length > 0 ? (
          <div
            className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} container mx-auto w-[90%] gap-4 py-4`}
          >
            {videos.map((video) => (
              <VideoItem key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-center">No videos found</p>
        )}
        <div></div>
      </section>
    </div>
  );
};

export default ChannelDetails;
