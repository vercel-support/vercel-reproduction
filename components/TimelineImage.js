import dynamic from "next/dynamic";

const Front = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Front)
);

const CameraReels = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.CameraReels)
);

const Player = dynamic(() => import("../components/Player"));
const Slides = dynamic(() => import("../components/Slides"));

import { proxy_link } from "../utils/proxy_link";
import { caption } from "../utils/caption";

import Image from "next/image";

const StaticOrDynamicImage = ({ node }) => {
  if (!node) return;
  // static cdn image
  if (node.thumbnail.includes("img-wmc")) {
    return (
      <Image
        src={node.thumbnail}
        alt={node.caption}
        width="480"
        height="480"
        layout="responsive"
        priority
      />
    );
  }

  return (
    <img
      className="slideImage"
      src={proxy_link(node.thumbnail)}
      width="100%"
      height="auto"
      alt={node.caption}
    />
  );
};

const TimelineImage = ({ node, type, props = {} }) => {
  const { username, follower } = props;

  return (
    <>
      <div className="position-relative slideBox">
        {node.is_slide ? (
          <Slides
            alt={node.caption}
            slides={node.slideArray}
            thumbnail={node.thumbnail}
          />
        ) : node.is_video ? (
          <Player node={node} />
        ) : (
          <StaticOrDynamicImage node={node} />
        )}
        {caption && caption[type](node, username, follower)}

        {node.is_slide ||
          (node.is_video && (
            <div className="overlay">
              {node.is_slide ? (
                <Front fontSize="1.5em" />
              ) : node.is_video ? (
                <CameraReels fontSize="1.5em" />
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default TimelineImage;
