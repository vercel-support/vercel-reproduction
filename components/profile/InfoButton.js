import dynamic from "next/dynamic";

const InfoCircle = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.InfoCircle)
);

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const InfoButton = ({ username }) => (
  <OverlayTrigger
    trigger="click"
    placement={"top"}
    overlay={
      <Popover id={`popover-positioned-top`}>
        <Popover.Title as="h5">Engagement Rate</Popover.Title>
        <Popover.Content>
          <p>@{username}s engagement rate is calculated as:</p>
          <small className="mb-1">(likes + comments)/ number of posts</small>
        </Popover.Content>
      </Popover>
    }
  >
    <InfoCircle fontSize="1.3em" />
  </OverlayTrigger>
);

export default InfoButton;
