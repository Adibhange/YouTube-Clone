import { Link } from "react-router-dom";
import NotFound from "../assets/Not-Found.png";

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <img src={NotFound} alt="Not Found" />
      <h1>This page isn't available. Sorry about that.</h1>
      <Link to="/">
        <button className="rounded-lg bg-primary px-4 py-2 text-white">
          Go back to home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
