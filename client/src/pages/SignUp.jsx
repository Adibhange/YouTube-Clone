import { Link, useNavigate } from "react-router-dom";
import { app } from "./../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "./../../axios.config";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (userAvatar && userAvatar.size > 2 * 1024 * 1024) {
      toast.error("User Avatar must be less than 2MB.");
      return;
    }

    try {
      // Upload userAvatar to Firebase Storage
      const storage = getStorage(app);
      const userAvatarName = `user/${userName} - ${Date.now()}`;
      const storageRef = ref(storage, userAvatarName);
      const uploadTask = uploadBytesResumable(storageRef, userAvatar);

      // Monitor upload progress
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      });

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(),
        );
      });

      const userAvatarURL = await getDownloadURL(uploadTask.snapshot.ref);

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/sign-up`,
        {
          userName,
          email,
          password,
          confirmPassword,
          userAvatar: userAvatarURL,
        },
      );
      const newUser = res.data;
      if (newUser) {
        navigate("/sign-in");
        toast.success("Sign up successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto my-4 w-1/2 space-y-4 rounded-xl bg-foreground p-4">
      <h1 className="text-center text-3xl font-bold">Sign Up</h1>

      <form className="mx-auto w-1/2 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col gap-2">
          <label className="text-xl">Profile Image:</label>
          <input
            type="file"
            id="userAvatar"
            name="userAvatar"
            accept="image/*"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setUserAvatar(e.target.files[0])}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Username:</label>
          <input
            type="name"
            id="userName"
            name="userName"
            placeholder="Enter your username"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <label className="text-xl">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <hr />
      <p className="p-2 text-center text-xl text-copy-light">
        Already have an account?
        <Link to="/sign-in" className="text-blue-500">
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
