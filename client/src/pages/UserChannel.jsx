import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./../../axios.config";
import SideBar from "../components/SideBar";
import ChannelItems from "../components/ChannelItems";
import { useNavigate } from "react-router-dom";
import CreateChannel from "./CreateChannel";

const UserChannel = () => {
  const [userChannel, setUserChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserChannel = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/channel/my-channel`,
          {
            headers: {
              Authorization: `JWT ${currentUser.token}`,
            },
          },
        );

        // console.log(res.data.channel);
        setUserChannel(res.data.channel);
        setVideos(res.data.channel.videos);
      } catch (error) {
        // console.log(error.status);
        if (error.status === 500) {
          navigate("/create-channel");
        }
      }
    };
    fetchUserChannel();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      {userChannel && <ChannelItems channel={userChannel} videos={videos} />}
    </div>
  );
};

export default UserChannel;
