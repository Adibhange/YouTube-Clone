import { useNavigate } from "react-router-dom";
import { categories } from "../utils/categoryData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "./../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "./../../axios.config";
import { toast } from "react-toastify";

const UploadVideo = () => {
  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (videoThumbnail.size === 2 * 1024 * 1024) {
      toast.error("Channel Banner must be less than 2MB.");
      return;
    }

    if (videoFile.size === 10 * 1024 * 1024) {
      toast.error("Channel Banner must be less than 10MB.");
      return;
    }

    try {
      const storage = getStorage(app);
      // Upload Video Thumbnail
      const videoThumbnailName = `video-thumbnail/${videoName} - ${Date.now()}`;
      const storageVideoThumbnailRef = ref(storage, videoThumbnailName);
      const uploadVideoThumbnailTask = uploadBytesResumable(
        storageVideoThumbnailRef,
        videoThumbnail,
      );
      await new Promise((resolve, reject) => {
        uploadVideoThumbnailTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(),
        );
      });
      const videoThumbnailURL = await getDownloadURL(
        uploadVideoThumbnailTask.snapshot.ref,
      );

      // Upload Video File
      const videoFileName = `video/${videoName} - ${Date.now()}`;
      const storageVideoRef = ref(storage, videoFileName);
      const uploadVideoTask = uploadBytesResumable(storageVideoRef, videoFile);

      await new Promise((resolve, reject) => {
        uploadVideoTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(),
        );
      });

      const videoFileURL = await getDownloadURL(uploadVideoTask.snapshot.ref);

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/upload`,
        {
          title: videoName,
          description,
          thumbnail: videoThumbnailURL,
          duration,
          videoFile: videoFileURL,
          category,
        },
        {
          headers: {
            Authorization: `JWT ${currentUser.token}`,
          },
        },
      );

      if (res.status === 201) {
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
    <section className="container mx-auto my-4 w-full space-y-6 rounded-xl bg-foreground px-4 py-6 md:my-8 md:py-8 lg:w-3/5 xl:w-1/2">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Upload Video
      </h1>

      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-xl">Video Title:</label>
          <input
            type="text"
            id="videoName"
            name="videoName"
            placeholder="Enter video name"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setVideoName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-xl">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter video description"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-xl">Video Category:</label>
          <select
            id="category"
            name="category"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
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
          <label className="text-lg md:text-xl">Video Duration:</label>
          <input
            type="time"
            id="duration"
            name="duration"
            placeholder="Enter video duration"
            className="rounded-lg bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-3 md:text-base"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-xl">Video Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            className="rounded-lg bg-background p-2 text-sm file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-2 focus:ring-blue-500 md:file:px-6 md:file:py-3"
            accept="images/*"
            onChange={(e) => setVideoThumbnail(e.target.files[0])}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-xl">Video File:</label>
          <input
            type="file"
            id="video"
            name="video"
            className="rounded-lg bg-background p-2 text-sm file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-2 focus:ring-blue-500 md:file:px-6 md:file:py-3"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#ff0200] md:py-3 md:text-base"
          onClick={handleUploadVideo}
          disabled={isLoading}
        >
          {isLoading ? "Uploading video..." : "Upload Video"}
        </button>
      </form>
    </section>
  );
};

export default UploadVideo;
