import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./../../axios.config";
import { useDispatch, useSelector } from "react-redux";
import { requestStart, signInSuccess } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign in failed");
    }
  };

  return (
    <section className="container mx-auto my-4 w-full max-w-md space-y-6 rounded-xl bg-foreground px-4 py-6 md:px-6">
      <h1 className="text-center text-2xl font-bold md:text-3xl">Sign In</h1>

      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg md:text-xl">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg md:text-xl">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#ff0200] md:py-3 md:text-base"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </form>

      <hr />
      <p className="text-center text-sm text-copy-light md:text-base">
        Don't have an account?
        <Link to="/sign-up" className="ml-1 text-blue-500">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
