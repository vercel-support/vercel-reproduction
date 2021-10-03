import styles from "./HashtagBox.module.css";
import formatNumber from "../../utils/numbers";
import Link from "next/link";

const HashtagBox = ({ hashtags }) => {
  if (hashtags) {
    return (
      <div className="container pt-5 searchBox">
        <div className="row justify-content-center">
          {hashtags?.length > 0 &&
            hashtags.map((tag, index) => {
              return (
                <Link
                  prefetch={false}
                  href={"/tag/" + encodeURIComponent(tag.name ?? tag)}
                  key={index}
                >
                  <a className={`${styles.tagLink}`}>
                    <div className={`${styles.tagContainer} col-auto mb-4`}>
                      <span>#{tag.name ?? tag}</span>

                      {tag?.media_count && (
                        <span className={styles.right}>
                          {formatNumber(tag.media_count)}
                        </span>
                      )}
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container pt-5 searchBox">
        <p className="text-center">Could not find matching hashtags.</p>
      </div>
    );
  }
};

export default HashtagBox;
