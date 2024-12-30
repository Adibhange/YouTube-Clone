import { Link, useNavigate } from "react-router-dom";
import Logo from "./../assets/Logo";
import {
  BackIcon,
  HamBurgerMenuIcon,
  ProfileIcon,
  SearchIcon,
  SpeakIcon,
  VerticalThreeDotIcon,
} from "./../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { useEffect, useRef, useState } from "react";
import { signOutSuccess } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  // Toggle modal visibility on avatar click
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle SignOut
  const handleSignOut = () => {
    dispatch(signOutSuccess());
    setIsModalOpen(false);
    toast.success("Sign out successful");
  };

  // Handle Search
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`);
    }
  };

  // Handle Search Toggle
  const handleOpenSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-12 items-center justify-between bg-background px-4 sm:h-16">
      <div className="relative flex items-center gap-2 md:gap-4">
        <button
          className="rounded-full p-2 transition-colors duration-300 hover:bg-foreground"
          onClick={handleSidebarToggle}
        >
          <HamBurgerMenuIcon />
        </button>
        <Link to="/">
          <Logo />
        </Link>
        <span className="absolute -right-4 top-0 text-xs text-copy-lighter">
          IN
        </span>
      </div>

      <div className="flex w-1/2 items-center justify-center gap-2 md:gap-4 lg:gap-6">
        <div className="hidden w-full items-center rounded-full sm:flex md:w-3/4">
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

        <button className="hidden rounded-full bg-foreground p-2 sm:block">
          <SpeakIcon />
        </button>
      </div>

      <div className="flex w-full items-center justify-end gap-2 sm:w-auto md:gap-4 lg:gap-6">
        <button
          onClick={handleOpenSearchToggle}
          className="rounded-full bg-foreground p-2 sm:hidden"
        >
          <SearchIcon size="20" />
        </button>

        {isSearchOpen && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background bg-opacity-90">
            <div className="relative w-11/12 max-w-lg p-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute -left-8 top-4 p-2 text-copy-light hover:text-copy"
              >
                <BackIcon />
              </button>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 rounded-l-full border border-border bg-background px-4 py-2 focus:outline-none"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleSearch();
                    setIsSearchOpen(false); // Close modal after search
                  }}
                  className="rounded-r-full border border-border bg-foreground px-4 py-2"
                >
                  <SearchIcon />
                </button>

                <button className="ml-4 rounded-full bg-foreground p-2 sm:hidden">
                  <SpeakIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="rounded-full bg-foreground p-2 sm:hidden">
          <SpeakIcon size="20" />
        </button>

        <button className="hidden sm:block">
          <VerticalThreeDotIcon />
        </button>

        {currentUser ? (
          <div className="relative flex items-center gap-2" ref={modalRef}>
            <Link to="/upload-video">
              <p className="hidden rounded-full border-2 border-border px-2 py-1 md:block">
                Upload Video
              </p>
            </Link>

            <img
              src={currentUser.userData.userAvatar}
              alt="Avatar"
              className="size-8 cursor-pointer rounded-full sm:size-10"
              onClick={handleModalToggle}
            />

            {isModalOpen && (
              <div className="absolute right-0 top-12 z-50 w-36 rounded-lg bg-foreground">
                <div className="p-2">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-copy-light hover:text-copy"
                    onClick={handleModalToggle}
                  >
                    <Link to="/user-channel">Go to Channel</Link>
                  </button>

                  <button className="w-full px-4 py-2 text-left text-sm text-copy-light hover:text-copy md:hidden">
                    <Link to="/upload-video">Upload Video</Link>
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
