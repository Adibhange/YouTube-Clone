import { Link, useNavigate } from "react-router-dom";
import Logo from "./../assets/Logo";
import {
  HamBurgerMenuIcon,
  ProfileIcon,
  SearchIcon,
  SpeakIcon,
  VerticalThreeDotIcon,
} from "./../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { useState } from "react";
import { signOutSuccess } from "../redux/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  // Toggle modal visibility on avatar click
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle SignOut
  const handleSignOut = () => {
    dispatch(signOutSuccess());
    setIsModalOpen(false);
  };

  // Handle Search
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-16 items-center justify-between bg-background px-4">
      <div className="relative flex items-center gap-4">
        <span
          className="cursor-pointer rounded-full p-2 transition-colors duration-300 hover:bg-foreground"
          onClick={handleSidebarToggle}
        >
          <HamBurgerMenuIcon />
        </span>
        <Link to="/">
          <Logo />
        </Link>
        <span className="absolute -right-4 top-0 text-xs text-copy-lighter">
          IN
        </span>
      </div>

      <div className="flex w-1/2 items-center justify-center gap-6">
        <div className="flex w-3/4 items-center rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-l-full border border-border bg-background px-4 py-2 focus:outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="rounded-r-full border border-border bg-foreground px-4 py-2"
          >
            <SearchIcon />
          </button>
        </div>

        <span className="cursor-pointer rounded-full bg-foreground p-2">
          <SpeakIcon />
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="cursor-pointer">
          <VerticalThreeDotIcon />
        </span>

        {currentUser ? (
          <div className="relative flex items-center gap-2">
            <Link to="/upload-video">
              <p className="rounded-full border-2 border-border px-2 py-1">
                Upload Video
              </p>
            </Link>

            <img
              src={currentUser.userData.userAvatar}
              alt="Avatar"
              className="h-10 w-10 cursor-pointer rounded-full"
              onClick={handleModalToggle}
            />

            {isModalOpen && (
              <div className="absolute right-0 top-12 z-50 w-36 rounded-lg bg-foreground">
                <div className="p-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-copy-light hover:text-copy">
                    <Link to="/user-channel">Go to Channel</Link>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-copy-light hover:text-copy"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="flex items-center gap-1 rounded-full border border-border px-4 py-2 transition-colors duration-300 hover:bg-foreground"
          >
            <ProfileIcon />
            <p>Sign in</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
