import dynamic from "next/dynamic";

const Heart = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Heart)
);

const ChatDots = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ChatDots)
);

const GraphUp = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.GraphUp)
);

const BookmarkHeart = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.BookmarkHeart)
);

const ChatLeftText = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ChatLeftText)
);

import Card from "react-bootstrap/Card";
import formatNumber from "../utils/numbers";

function EngagementCards({ data }) {
  const {
    node_amount,
    engagementRate,
    likes,
    avg_likes,
    comments,
    avg_comments,
  } = data;

  return (
    <div className="container stats">
      {/* <div className="row align-middle justify-content-center gy-3">
        <div className="col text-center">
          <Alert variant="info">
            Statistics based on the last {node_amount} posts.
          </Alert>
        </div>
      </div> */}
      <div className="row row-cols-1 row-cols-lg-5 align-middle justify-content-center gy-3">
        <div className="col mb-3 mb-lg-0">
          <Card className="profile-stats-card h-100" id="engagement-card">
            <Card.Body>
              <Card.Title>
                <b>{engagementRate}%</b>
                <GraphUp className="ml-2 text-white" />
              </Card.Title>
              <Card.Text>Engagement Rate</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col mb-3 mb-lg-0">
          <Card className="profile-stats-card h-100">
            <Card.Body>
              <Card.Title>
                <b>{formatNumber(likes)}</b>
                <Heart className="ml-2" />
              </Card.Title>
              <Card.Text>Total Likes</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col mb-3 mb-lg-0">
          <Card className="profile-stats-card h-100">
            <Card.Body>
              <Card.Title>
                <b>{formatNumber(avg_likes)}</b>
                <BookmarkHeart className="ml-2" />
              </Card.Title>
              <Card.Text>Avg. Likes</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col mb-3 mb-lg-0">
          <Card className="profile-stats-card h-100">
            <Card.Body>
              <Card.Title>
                <b>{formatNumber(comments)}</b>
                <ChatDots className="ml-2" />
              </Card.Title>
              <Card.Text>Total Comments</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col mb-0">
          <Card className="profile-stats-card h-100">
            <Card.Body>
              <Card.Title>
                <b>{formatNumber(avg_comments)}</b>
                <ChatLeftText className="ml-2" />
              </Card.Title>
              <Card.Text>Avg. Comments</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EngagementCards;
