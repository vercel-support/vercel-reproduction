import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TimelineImage from "./TimelineImage";

const ProfileImages = ({ timeline, type = "profile", props }) => {
  if (timeline.length == 0) return <></>;

  // otherwise slider not working right
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    setShowTimeline(true);
  }, []);

  return (
    <>
      {showTimeline && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 500: 1, 800: 2, 1200: 3 }}
        >
          <Masonry gutter="20px">
            {timeline.map((node) => (
              <TimelineImage
                key={node.id}
                node={node}
                props={props}
                type={type}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
};

export default ProfileImages;
