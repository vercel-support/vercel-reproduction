import dynamic from "next/dynamic";

const PatchCheck = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.PatchCheck)
);

import formatNumber from "../utils/numbers";
import { proxy_link } from "../utils/proxy_link";

const ProfileInfo = ({ user }) => (
  <div className="container">
    <div className="row profileInfo">
      <div className="col-12 col-sm-4 pic text-center">
        <img
          className="profilePic"
          width="150"
          height="150"
          src={
            user.profile_pic_url?.includes("img-wmc")
              ? user.profile_pic_url
              : proxy_link(user.profile_pic_url)
          }
          alt={user.username}
        />
      </div>
      <div className="col-12 col-sm-8">
        <h1 className="username mb-3">@{user.username}</h1>

        {user.is_verified && (
          <p>
            <b>Verified Account</b>{" "}
            <PatchCheck
              className="ml-1 text-primary"
              width="1.5em"
              height="1.5em"
            />
          </p>
        )}

        <p className="mb-1">
          <b>{formatNumber(user.post_amount)}</b> Posts
        </p>
        <p className="mb-1">
          <b>{formatNumber(user.follower)}</b> Follower
        </p>
        <p className="mb-1">
          <b>{formatNumber(user.following)}</b> Following
        </p>

        <p className="fullname m-0 mt-3">
          <b>{user.full_name}</b>
        </p>
        <p className="biography m-0">{user.biography}</p>
      </div>
    </div>
  </div>
);

export default ProfileInfo;
