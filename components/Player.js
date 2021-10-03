import ReactPlayer from "react-player/lazy";
import { useState } from "react";
import { proxy_link } from "../utils/proxy_link";

const Player = ({ node }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="wrapper position-relative">
      <ReactPlayer
        className="react-player"
        url={proxy_link(node.video_url)}
        width="100%"
        height="auto"
        light={proxy_link(node.thumbnail)}
        controls
        playing
        alt={node.caption}
        onClickPreview={() => setShow(false)}
      />
      {show && (
        <img
          src={proxy_link(node.thumbnail)}
          width="100%"
          height="auto"
          className="wrapper-image"
          alt={node.caption}
        />
      )}
    </div>
  );
};

export default Player;
