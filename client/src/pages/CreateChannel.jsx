import { useState } from "react";
import { categories } from "../utils/categoryData";
import { app } from "./../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "./../../axios.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);
  const [category, setCategory] = useState("");
  const [channelAvatar, setChannelAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (channelBanner.size === 2 * 1024 * 1024) {
      setError("Channel Banner must be less than 2MB.");
      return;
    }

    if (channelAvatar.size > 2 * 1024 * 1024) {
      setError("Channel Avatar must be less than 2MB.");
      return;
    }

    try {
      const storage = getStorage(app);
      // Upload Channel Banner
      const channelBannerName = `channel-banner/${channelName} - ${Date.now()}`;
      const storageBannerRef = ref(storage, channelBannerName);
      const uploadBannerTask = uploadBytesResumable(
        storageBannerRef,
        channelBanner,
      );

      await new Promise((resolve, reject) => {
        uploadBannerTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(),
        );
      });

      const channelBannerURL = await getDownloadURL(
        uploadBannerTask.snapshot.ref,
      );

      // Upload Channel Avatar
      const channelAvatarName = `channel-avatar/${channelName} - ${Date.now()}`;
      const storageAvatarRef = ref(storage, channelAvatarName);
      const uploadAvatarTask = uploadBytesResumable(
        storageAvatarRef,
        channelAvatar,
      );

      await new Promise((resolve, reject) => {
        uploadAvatarTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(),
        );
      });

      const channelAvatarURL = await getDownloadURL(
        uploadAvatarTask.snapshot.ref,
      );

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/channel/create`,
        {
          channelName,
          description,
          channelBanner: channelBannerURL,
          category,
          channelAvatar: channelAvatarURL,
        },
        {
          headers: {
            Authorization: `JWT ${currentUser.token}`,
          },
        },
      );

      if (res.status === 201) {
        navigate("/user-channel");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto my-4 w-1/2 space-y-4 rounded-xl bg-foreground p-4">
      <h1 className="text-center text-3xl font-bold">Create Channel</h1>

      <form className="mx-auto w-1/2 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Name:</label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            placeholder="Enter your channel name"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your channel description"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Category:</label>
          <select
            id="category"
            name="category"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Banner:</label>
          <input
            type="file"
            id="channelBanner"
            name="channelBanner"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept="image/*"
            onChange={(e) => setChannelBanner(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Avatar:</label>
          <input
            type="file"
            id="channelAvatar"
            name="channelAvatar"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept="image/*"
            onChange={(e) => setChannelAvatar(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
          onClick={handleCreateChannel}
          disabled={isLoading}
        >
          {isLoading ? "Creating Channel..." : "Create Channel"}
        </button>
      </form>
    </section>
  );
};

export default CreateChannel;
