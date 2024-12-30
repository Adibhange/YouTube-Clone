import { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

const EditChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);
  const [channelAvatar, setChannelAvatar] = useState(null);
  const [channelBannerPreview, setChannelBannerPreview] = useState("");
  const [channelAvatarPreview, setChannelAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/channel/my-channel`,
          {
            headers: {
              Authorization: `JWT ${currentUser.token}`,
            },
          },
        );

        const { channelName, description, channelBanner, channelAvatar } =
          res.data.channel;
        setChannelName(channelName);
        setDescription(description);
        setChannelBannerPreview(channelBanner);
        setChannelAvatarPreview(channelAvatar);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchChannelData();
  }, [currentUser]);

  const handleEditChannel = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (channelBanner && channelBanner.size === 2 * 1024 * 1024) {
      toast.error("Channel Banner must be less than 2MB.");
      return;
    }

    if (channelAvatar && channelAvatar.size > 2 * 1024 * 1024) {
      toast.error("Channel Avatar must be less than 2MB.");
      return;
    }

    try {
      const storage = getStorage(app);

      // Upload Channel Banner if updated
      let channelBannerURL = channelBannerPreview;
      if (channelBanner) {
        const bannerRef = ref(
          storage,
          `channel-banner/${channelName}-${Date.now()}`,
        );
        const bannerTask = uploadBytesResumable(bannerRef, channelBanner);
        await new Promise((resolve, reject) => {
          bannerTask.on("state_changed", null, reject, resolve);
        });
        channelBannerURL = await getDownloadURL(bannerTask.snapshot.ref);
      }

      // Upload Channel Avatar if updated
      let channelAvatarURL = channelAvatarPreview;
      if (channelAvatar) {
        const avatarRef = ref(
          storage,
          `channel-avatar/${channelName}-${Date.now()}`,
        );
        const avatarTask = uploadBytesResumable(avatarRef, channelAvatar);
        await new Promise((resolve, reject) => {
          avatarTask.on("state_changed", null, reject, resolve);
        });
        channelAvatarURL = await getDownloadURL(avatarTask.snapshot.ref);
      }

      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/channel/update`,
        {
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

      if (res.status === 200) {
        navigate("/user-channel");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto my-4 w-full space-y-6 rounded-xl bg-foreground px-4 py-6 md:w-3/5 lg:w-1/2">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Edit Channel
      </h1>

      <form className="space-y-6">
        {/* Description Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg md:text-xl">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your channel description"
            value={description}
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Channel Banner Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="channelBanner" className="text-lg md:text-xl">
            Channel Banner:
          </label>
          {channelBannerPreview && (
            <img
              src={channelBannerPreview}
              alt="Preview"
              className="h-20 w-full rounded-lg object-cover md:h-32 lg:h-40"
            />
          )}
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
          <div className="flex w-full items-center gap-2">
            {channelAvatarPreview && (
              <img
                src={channelAvatarPreview}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
              />
            )}
            <input
              type="file"
              id="channelAvatar"
              name="channelAvatar"
              className="w-full rounded-lg bg-background p-2 text-sm file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-2 focus:ring-blue-500 md:file:px-6 md:file:py-3"
              accept="image/*"
              onChange={(e) => setChannelAvatar(e.target.files[0])}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#ff0200] md:py-3 md:text-base"
          onClick={handleEditChannel}
          disabled={isLoading}
        >
          {isLoading ? "Updating Channel..." : "Update Channel"}
        </button>
      </form>
    </section>
  );
};

export default EditChannel;
