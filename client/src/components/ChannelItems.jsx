import { useSelector } from "react-redux";
import { SearchIcon, VerticalThreeDotIcon } from "../utils/icons";
import { PublishedAt } from "./PublishedAt";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "./../../axios.config";
import { toast } from "react-toastify";

const ChannelItems = ({ channel, videos: initialVideos }) => {
  const [owner, setOwner] = useState(true);
  const [openModalId, setOpenModalId] = useState(null);
  const [videos, setVideos] = useState(initialVideos);

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  const { currentUser } = useSelector((state) => state.user);
  const modalRef = useRef();

  useEffect(() => {
    if (currentUser && channel && currentUser.userData._id === channel.Owner) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [currentUser, channel]);

  //   console.log(currentUser);

  const handleModalToggle = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModalId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle Delete Video
  const handleDeleteVideo = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/video/delete/${id}`,
        {
          headers: {
            Authorization: `JWT ${currentUser.token}`,
          },
        },
      );

      if (res.status === 200) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video._id !== id),
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
      <div className="py-2 lg:px-16">
        <img
          src={channel.channelBanner}
          alt={channel.channelName}
          className="h-40 w-full rounded-lg object-fill"
        />
      </div>

      <div className="flex w-full gap-4 pb-2 pt-4 lg:px-16">
        <img
          src={channel.channelAvatar}
          alt={channel.channelName}
          className="size-32 rounded-full md:size-36"
        />
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full gap-8">
            <p className="text-2xl font-bold sm:text-3xl">
              {channel.channelName}
            </p>
            {owner && (
              <button className="hidden rounded-md border-2 border-border px-4 py-1 hover:bg-foreground sm:block">
                <Link to="/edit-channel">Edit Channel</Link>
              </button>
            )}
          </div>
          <p className="text-copy-lighter">
            {channel.subscribers} subscibers • {channel.videos.length} videos
          </p>
          <p className="text-copy-lighter">{channel.description}</p>

          {owner || (
            <button className="rounded-full bg-copy px-4 py-2 text-black hover:bg-copy-light">
              Subscribe
            </button>
          )}

          {owner && (
            <button className="block rounded-md border-2 border-border px-4 py-1 hover:bg-foreground sm:hidden">
              <Link to="/edit-channel">Edit Channel</Link>
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 py-2 lg:gap-6 lg:px-16">
        <p className="cursor-not-allowed text-copy-light">Home</p>
        <p className="cursor-pointer text-copy transition hover:text-copy">
          Videos
        </p>
        <p className="hidden cursor-not-allowed text-copy-light sm:block">
          Shorts
        </p>
        <p className="hidden cursor-not-allowed text-copy-light sm:block">
          Live
        </p>
        <p className="hidden cursor-not-allowed text-copy-light sm:block">
          Podcasts
        </p>
        <p className="hidden cursor-not-allowed text-copy-light sm:block">
          Playlists
        </p>
        <p className="hidden cursor-not-allowed text-copy-light sm:block">
          Community
        </p>
        <p className="cursor-not-allowed text-copy-light">
          <SearchIcon />
        </p>
      </div>

      <hr className="border-2 border-border" />

      {videos.length > 0 ? (
        <div
          className={`grid ${
            isSidebarOpen
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
          } container mx-auto w-[90%] gap-4 py-4`}
        >
          {videos.map((video) => (
            <article key={video._id} className="flex flex-col gap-2">
              {/* Thumbnail Section */}
              <div className="group relative">
                <Link to={`/video/${video._id}`}>
                  <img
                    src={video.thumbnail}
                    alt={`Thumbnail of ${video.title}`}
                    className="w-full rounded-lg"
                  />
                </Link>
                {/* Duration */}
                <p className="absolute bottom-2 right-2 z-10 rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                  {video.duration}
                </p>
              </div>

              {/* Video Info */}
              <div className="flex gap-3">
                {/* Details */}
                <div className="flex w-full flex-col gap-1">
                  <div className="flex justify-between">
                    {/* Title */}
                    <Link
                      to={`/video/${video._id}`}
                      className="line-clamp-2 font-medium"
                    >
                      {video.title}
                    </Link>
                    {/* More Options Icon */}

                    {owner ? (
                      <div className="relative" ref={modalRef}>
                        <button
                          className="text-copy-light hover:text-copy"
                          onClick={() => handleModalToggle(video._id)}
                        >
                          <VerticalThreeDotIcon />
                        </button>

                        {openModalId === video._id && (
                          <div className="absolute right-0 top-6 z-50 w-24 rounded-lg bg-foreground">
                            <Link to={`/video/edit/${video._id}`}>
                              <button className="px-4 py-2 text-left text-copy-light hover:text-copy">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="px-4 py-2 text-left text-copy-light hover:text-copy"
                              onClick={() => handleDeleteVideo(video._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button className="text-copy-light hover:text-copy">
                        <VerticalThreeDotIcon />
                      </button>
                    )}
                  </div>

                  {/* Channel */}
                  <p className="text-sm text-copy-light hover:text-copy">
                    {video.channel.channelName}
                  </p>
                  {/* Views and Published Date */}
                  <p className="text-sm text-copy-lighter">
                    {video.views} • <PublishedAt createdAt={video.createdAt} />
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center">No videos found</p>
      )}
    </section>
  );
};

export default ChannelItems;
