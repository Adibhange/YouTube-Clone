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
    <header className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between bg-background px-4">
      <div className="flex items-center gap-6 p-4">
        <HamBurgerMenuIcon />
        <Logo />
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

        <span className="rounded-full bg-foreground px-2 py-2">
          <SpeakIcon />
        </span>
      </div>

      <div className="flex items-center gap-6">
        <VerticalThreeDotIcon />

        <div className="flex items-center gap-1 rounded-full border border-border px-4 py-2">
          <ProfileIcon />
          <p>Sign in</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
