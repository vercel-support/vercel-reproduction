import Link from "next/link";

const listItem = (tag) => (
  <div>
    {tag.name}
    <span className="float-right mr-3">{tag.amount}</span>
  </div>
);

const Tags = ({ tagHeader, tagCaption, tags, type, hidden }) => {
  return (
    <div
      className={`col ${type}-analysis`}
      style={{ display: hidden ? "none" : "block" }}
    >
      <div className="tag-container text-left">
        <div className="tag-header">
          {/* <h5>{tagHeader}</h5> */}
          <h5>{tagCaption}</h5>
        </div>
        <div className="spacer my-3 "></div>
        <div className="tag-body">
          <ul className="list-group">
            {tags
              .sort((a, b) => b["amount"] - a["amount"])
              .map((tag, key) => (
                <li className="tag-list-item py-1" key={key}>
                  {type === "tags" ? (
                    <Link
                      prefetch={false}
                      href={`/profile/${encodeURIComponent(tag.name.slice(1))}`}
                    >
                      <a href={tag.name.slice(1)} style={{ color: "#ececec" }}>
                        {listItem(tag)}
                      </a>
                    </Link>
                  ) : type === "hashtags" ? (
                    <Link
                      prefetch={false}
                      href={`/tag/${encodeURIComponent(tag.name.slice(1))}`}
                    >
                      <a style={{ color: "#ececec" }}>{listItem(tag)}</a>
                    </Link>
                  ) : (
                    <Link
                      prefetch={false}
                      href={`/location/${encodeURIComponent(
                        tag.slug
                      )}/${encodeURIComponent(tag.id)}`}
                    >
                      <a style={{ color: "#ececec" }}>{listItem(tag)}</a>
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tags;
