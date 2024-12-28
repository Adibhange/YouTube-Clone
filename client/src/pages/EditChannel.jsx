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
    <section className="container mx-auto my-4 w-1/2 space-y-4 rounded-xl bg-foreground p-4">
      <h1 className="text-center text-3xl font-bold">Edit Channel</h1>

      <form className="mx-auto w-1/2 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your channel description"
            value={description}
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Banner:</label>
          {channelBannerPreview && (
            <img src={channelBannerPreview} alt="Preview" className="h-20" />
          )}
          <input
            type="file"
            id="channelBanner"
            name="channelBanner"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept="image/*"
            onChange={(e) => setChannelBanner(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Avatar:</label>
          {channelAvatarPreview && (
            <img src={channelAvatarPreview} alt="Preview" className="h-20" />
          )}
          <input
            type="file"
            id="channelAvatar"
            name="channelAvatar"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept="image/*"
            onChange={(e) => setChannelAvatar(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
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
