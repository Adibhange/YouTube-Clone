import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./../../axios.config";
import ChannelItems from "../components/ChannelItems";

const ChannelDetails = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/channel/${id}`,
      );
      setChannel(res.data.channel);
      setVideos(res.data.channel.videos);
    };
    fetchChannel();
  }, [id]);

  // console.log(channel);
  // console.log(videos);

  return (
    <div className="flex">
      <SideBar />
      {channel && <ChannelItems channel={channel} videos={videos} />}
    </div>
  );
};

export default ChannelDetails;
