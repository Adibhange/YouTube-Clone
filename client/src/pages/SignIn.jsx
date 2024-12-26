import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./../../axios.config";
import { useDispatch, useSelector } from "react-redux";
import { requestStart, signInSuccess } from "../redux/slices/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useSelector((state) => state.user.user);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(requestStart());
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/sign-in`,
        {
          email,
          password,
        },
      );

      const user = await res.data;
      if (user) {
        dispatch(signInSuccess(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Sign in failed");
    }
  };

  return (
    <section className="container mx-auto my-4 w-1/2 space-y-4 rounded-xl bg-foreground p-4">
      <h1 className="text-center text-3xl font-bold">Sign In</h1>

      <form className="mx-auto w-1/2 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </form>

      <hr />
      <p className="p-2 text-center text-xl text-copy-light">
        Don't have an account?
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
