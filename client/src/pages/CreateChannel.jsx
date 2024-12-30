import { useState } from "react";
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
import { toast } from "react-toastify";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);
  const [channelAvatar, setChannelAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (channelBanner.size === 2 * 1024 * 1024) {
      toast.error("Channel Banner must be less than 2MB.");
      return;
    }

    if (channelAvatar.size > 2 * 1024 * 1024) {
      toast.error("Channel Avatar must be less than 2MB.");
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
          channelAvatar: channelAvatarURL,
        },
        {
          headers: {
            Authorization: `JWT ${currentUser.token}`,
          },
        },
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/user-channel");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto my-4 w-full space-y-6 rounded-xl bg-foreground px-4 py-6 md:my-8 md:py-8 lg:w-3/5 xl:w-1/2">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Create Channel
      </h1>

      <form className="space-y-6">
        {/* Channel Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-xl">Channel Name:</label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            placeholder="Enter your channel name"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg md:text-xl">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your channel description"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Channel Banner Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="channelBanner" className="text-lg md:text-xl">
            Channel Banner:
          </label>
          <input
            type="file"
            id="channelBanner"
            name="channelBanner"
            className="rounded-lg bg-background p-2 text-sm file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-2 focus:ring-blue-500 md:file:px-6 md:file:py-3"
            accept="image/*"
            onChange={(e) => setChannelBanner(e.target.files[0])}
          />
        </div>

        {/* Channel Avatar Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="channelAvatar" className="text-lg md:text-xl">
            Channel Avatar:
          </label>
          <input
            type="file"
            id="channelAvatar"
            name="channelAvatar"
            className="rounded-lg bg-background p-2 text-sm file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-2 focus:ring-blue-500 md:file:px-6 md:file:py-3"
            accept="image/*"
            onChange={(e) => setChannelAvatar(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#ff0200] md:py-3 md:text-base"
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
