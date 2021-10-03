import formatNumber from "../../utils/numbers";
import Link from "next/link";

const HashtagResults = ({ hashtags }) => {
  return (
    <ul className="searchResults m-auto">
      {hashtags.map((tag, index) => (
        <li key={index}>
          <Link prefetch={false} href={"/tag/" + encodeURIComponent(tag.name)}>
            <a className="btn my-auto">
              <div className="col-md-auto text-left">
                <b>#{tag.name}</b>
                <span style={styles.mediaRight}>
                  {formatNumber(tag.media_count) + " Posts"}
                </span>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  mediaRight: {
    right: 0,
    position: "absolute",
  },
};

export default HashtagResults;
