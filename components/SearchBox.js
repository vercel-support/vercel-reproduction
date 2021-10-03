import { proxy_link } from "../utils/proxy_link";
import Link from "next/link";

const SearchBox = ({ users, images = true }) => {
  if (users) {
    return (
      <div className="container pt-5 searchBox">
        <div className="row justify-content-center">
          {users &&
            users.map((user, index) => {
              return (
                <div className="col mb-5" key={index}>
                  <Link
                    prefetch={false}
                    href={"/profile/" + encodeURIComponent(user.username)}
                  >
                    <a>
                      <div className="profileBox text-center">
                        {images ? (
                          <img
                            src={proxy_link(user.picture)}
                            alt={user.username}
                            width="100"
                          />
                        ) : (
                          <img
                            src={user.picture}
                            alt={user.username}
                            width="100"
                          />
                        )}

                        <p className="mt-2 text-dark">{user.username}</p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container pt-5 searchBox">
        <p className="text-center">No matching profiles found.</p>
      </div>
    );
  }
};

export default SearchBox;
