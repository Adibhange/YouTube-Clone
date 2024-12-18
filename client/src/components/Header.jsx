import { Link } from "react-router-dom";
import Logo from "./../assets/Logo";
import {
  HamBurgerMenuIcon,
  ProfileIcon,
  SearchIcon,
  SpeakIcon,
  VerticalThreeDotIcon,
} from "./../utils/icons";

const Header = () => {
  return (
    <header className="sticky left-0 right-0 top-0 flex h-16 items-center justify-between bg-background px-4">
      <div className="relative flex items-center gap-4">
        <span className="cursor-pointer rounded-full p-2 transition-colors duration-300 hover:bg-foreground">
          <HamBurgerMenuIcon />
        </span>
        <Link to="/">
          <Logo />
        </Link>
        <span className="absolute right-0 top-5 text-xs text-copy-lighter">
          IN
        </span>
      </div>

      <div className="flex w-1/2 items-center justify-center gap-6">
        <div className="flex w-3/4 items-center rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-l-full border border-border bg-background px-4 py-2 focus:outline-none"
          />
          <button className="rounded-r-full border border-border bg-foreground px-4 py-2">
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

        <Link
          to="/sign-in"
          className="flex items-center gap-1 rounded-full border border-border px-4 py-2 transition-colors duration-300 hover:bg-foreground"
        >
          <ProfileIcon />
          <p>Sign in</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
