import Link from "next/link";
import { proxy_link } from "../utils/proxy_link";

const SearchResults = ({ users }) => (
  <ul className="searchResults m-auto">
    {users.map((user) => {
      return (
        <li key={user.username}>
          <Link
            href={"/profile/" + encodeURIComponent(user.username)}
            prefetch={false}
          >
            <a className="btn">
              <div className="d-flex align-items-center">
                <div className="col-2">
                  <img
                    className="searchImage"
                    alt={user.username}
                    src={
                      user.picture.includes("img-wmc")
                        ? user.picture
                        : proxy_link(user.picture)
                    }
                    width="50"
                  />
                </div>

                <div className="col-md-auto text-left">
                  <b>{user.name}</b>
                  <p>@{user.username}</p>
                </div>
              </div>
            </a>
          </Link>
        </li>
      );
    })}
  </ul>
);

export default SearchResults;
