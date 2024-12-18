import { Link } from "react-router-dom";
import {
  FashionAndBeautyIcon,
  FeedbackIcon,
  GamingIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  LiveIcon,
  MoviesIcon,
  MusicIcon,
  NewsIcon,
  PodcastsIcon,
  ProfileIcon,
  ReportIcon,
  SettingsIcon,
  ShoppingIcon,
  ShortsIcon,
  SportsIcon,
  SubscriptionsIcon,
  TrendingIcon,
  YTKidsIcon,
  YTMusicIcon,
  YTPremiumIcon,
} from "../utils/icons";
import { useSelector } from "react-redux";

const SideBar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <aside
      className={`${isSidebarOpen ? "visible max-w-[15rem] opacity-100" : "invisible max-w-0 opacity-0"} scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground h-[calc(100vh-4rem)] divide-y-2 divide-border overflow-y-auto transition-all duration-300`}
    >
      <div className="p-3">
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <HomeIcon /> <span>Home</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <ShortsIcon /> <span>Shorts</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <SubscriptionsIcon /> <span>Subscriptions</span>
        </button>
      </div>

      <div className="p-3">
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <ProfileIcon /> <span>You</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <HistoryIcon /> <span>History</span>
        </button>
      </div>

      <div className="p-6">
        <p className="text-sm">Sign in to like videos and comment</p>
        <Link
          to="/sign-in"
          className="mt-2 flex items-center justify-center gap-1 rounded-full border border-border px-4 py-2 transition-colors duration-300 hover:bg-foreground"
        >
          <ProfileIcon />
          <p>Sign in</p>
        </Link>
      </div>

      <div className="p-3">
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <TrendingIcon /> <span>Trending</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <ShoppingIcon /> <span>Shopping</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <MusicIcon /> <span>Music</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <MoviesIcon /> <span>Movies</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <LiveIcon /> <span>Live</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <GamingIcon /> <span>Gaming</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <NewsIcon /> <span>News</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <SportsIcon /> <span>Sports</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <FashionAndBeautyIcon /> <span>Fashion & Beauty</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <PodcastsIcon /> <span>Podcasts</span>
        </button>
      </div>

      <div className="p-3">
        <p className="p-2">More From YouTube</p>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <YTPremiumIcon /> <span>YouTube Premium</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <YTMusicIcon /> <span>YouTube Music</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <YTKidsIcon /> <span>YouTube Kids</span>
        </button>
      </div>

      <div className="p-3">
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <SettingsIcon /> <span>Settings</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <ReportIcon /> <span>Report History </span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <HelpIcon /> <span>Help</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-lg p-2 hover:bg-foreground">
          <FeedbackIcon /> <span>Send Feedback</span>
        </button>
      </div>

      <footer className="p-3 text-center text-sm text-copy-lighter">
        <p>&copy; 2024 YouTube Clone.</p>
        <span>Aditya Bhange.</span>
      </footer>
    </aside>
  );
};

export default SideBar;
