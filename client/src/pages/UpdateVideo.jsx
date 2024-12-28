import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../utils/categoryData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "../../axios.config";
import { toast } from "react-toastify";

const UpdateVideo = () => {
  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [videoThumbnailPreview, setVideoThumbnailPreview] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [existingData, setExistingData] = useState(null);

  const navigate = useNavigate();
  const { videoId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // Fetch existing video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/${videoId}`,
          {
            headers: {
              Authorization: `JWT ${currentUser.token}`,
            },
          },
        );
        const data = res.data.video;
        setExistingData(data);
        setVideoName(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setDuration(data.duration);
        setVideoThumbnailPreview(data.thumbnail);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchVideoDetails();
  }, [videoId, currentUser.token]);

  if (videoThumbnail && videoThumbnail.size > 2 * 1024 * 1024) {
    toast.error("Thumbnail must be less than 2MB.");
  }

  if (videoFile && videoFile.size > 10 * 1024 * 1024) {
    toast.error("Video file must be less than 10MB.");
  }

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const storage = getStorage(app);

      let thumbnailURL = existingData?.thumbnail;
      let videoURL = existingData?.videoFile;

      // Upload new thumbnail if updated
      if (videoThumbnail) {
        const thumbnailName = `video-thumbnail/${videoName}-${Date.now()}`;
        const thumbnailRef = ref(storage, thumbnailName);
        const thumbnailUploadTask = uploadBytesResumable(
          thumbnailRef,
          videoThumbnail,
        );
        await new Promise((resolve, reject) => {
          thumbnailUploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => resolve(),
          );
        });
        thumbnailURL = await getDownloadURL(thumbnailUploadTask.snapshot.ref);
      }

      // Upload new video file if updated
      if (videoFile) {
        const videoFileName = `video/${videoName}-${Date.now()}`;
        const videoRef = ref(storage, videoFileName);
        const uploadVideoTask = uploadBytesResumable(videoRef, videoFile);

        await new Promise((resolve, reject) => {
          uploadVideoTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => resolve(),
          );
        });
        videoURL = await getDownloadURL(uploadVideoTask.snapshot.ref);
      }

      // API Request
      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/update/${videoId}`,
        {
          title: videoName,
          description,
          thumbnail: thumbnailURL,
          duration,
          videoFile: videoURL,
          category,
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
      <h1 className="text-center text-3xl font-bold">Update Video</h1>

      <form className="mx-auto w-1/2 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Video Title:</label>
          <input
            type="text"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Description:</label>
          <textarea
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Video Category:</label>
          <select
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Video Duration:</label>
          <input
            type="time"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Video Thumbnail:</label>
          {videoThumbnailPreview && (
            <img src={videoThumbnailPreview} alt="Preview" className="h-40" />
          )}
          <input
            type="file"
            accept="images/*"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setVideoThumbnail(e.target.files[0])}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Video File:</label>
          <input
            type="file"
            accept="video/*"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
          onClick={handleUpdateVideo}
          disabled={isLoading}
        >
          {isLoading ? "Updating video..." : "Update Video"}
        </button>
      </form>
    </section>
  );
};

export default UpdateVideo;
