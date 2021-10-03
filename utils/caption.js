import dynamic from "next/dynamic";
import Link from "next/link";

const Heart = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Heart)
);

const ChatDots = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ChatDots)
);
const BarChartLine = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.BarChartLine)
);
const GeoAlt = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.GeoAlt)
);

import formatNumber from "../utils/numbers";

const caption = {
  profile: (node, username, follower) =>
    profileCaption(node, username, follower),
  tag: (node) => tagCaption(node),
};

const profileCaption = (node, username = "", follower = 0) => (
  <div className="pt-3 commentBox">
    <div>
      <div>
        <span className="float-right">{node.date}</span>
        <p className="text-secondary">@{username}</p>

        <span id="likes" className="mr-3">
          <Heart fontSize="1.25em" /> {formatNumber(node.liked)} Likes
        </span>
        <div className="w-100 my-1 d-md-none"></div>
        <span className="d-block d-sm-inline-block" id="comments">
          <ChatDots fontSize="1.25em" /> {formatNumber(node.comment_count)}{" "}
          Comments
        </span>
        <div className="w-100 my-1"></div>
        <span className="mr-3">
          <BarChartLine fontSize="1.25em" className="mr-1 mb-1" />
          {(((node.liked + node.comment_count) / follower) * 100).toFixed(2)}%
          Engagement rate
        </span>
        {node.location && (
          <>
            <div className="w-100 my-1"></div>
            <span className="mr-3">
              <GeoAlt fontSize="1.25em" className="mr-1 mb-1" />
              <Link
                prefetch={false}
                href={`/location/${encodeURIComponent(
                  node.location.slug
                )}/${encodeURIComponent(node.location.id)}`}
              >
                <a>{node.location.name}</a>
              </Link>
            </span>
          </>
        )}
      </div>

      <div className="mt-3">
        <p
          id="caption"
          dangerouslySetInnerHTML={{
            __html: node.link_caption ?? node.caption,
          }}
        ></p>
      </div>
    </div>
  </div>
);

const tagCaption = (node) => {
  return (
    <div className="pt-3 commentBox">
      <div>
        <span className="float-right">{node.date}</span>

        <span id="likes" className="mr-3">
          <Heart fontSize="1.25em" /> {formatNumber(node.liked)} Likes
        </span>
        <div className="w-100 my-1 d-md-none"></div>
        <span className="d-block d-sm-inline-block" id="comments">
          <ChatDots fontSize="1.25em" /> {formatNumber(node.comment_count)}{" "}
          Comments
        </span>
        <div className="w-100 my-1"></div>
      </div>

      <div className="mt-3">
        <p
          id="caption"
          dangerouslySetInnerHTML={{
            __html: node.link_caption ?? node.caption,
          }}
        ></p>
      </div>
    </div>
  );
};

module.exports = { caption };
