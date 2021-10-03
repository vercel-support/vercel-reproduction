import dynamic from "next/dynamic";

const Heart = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Heart)
);

const ChatDots = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ChatDots)
);

const CardImage = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.CardImage)
);

const CalendarDay = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.CalendarDay)
);

const BarChartLine = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.BarChartLine)
);

import formatNumber from "../utils/numbers";
import Image from "next/image";
import styles from "./CdnTable.module.css";

function CdnTable({ data }) {
  if (data.length === 0) return null;

  return (
    <div className={`${styles.container}`}>
      <div
        className={`row row-cols-5 justify-content-center align-items-center text-center ${styles.tableHead} mx-0`}
      >
        <div className="col">
          <CardImage fontSize="1.5em" />
        </div>
        <div className="col">
          <CalendarDay fontSize="1.5em" />
        </div>
        <div className="col">
          <Heart fontSize="1.5em" />
        </div>
        <div className="col">
          <ChatDots fontSize="1.5em" />
        </div>
        <div className="col">
          <BarChartLine fontSize="1.5em" />
        </div>
      </div>

      {data.map((node) => {
        return node.thumbnail.includes("img-wmc") ? (
          <div
            className={`row row-cols-5 mb-2 justify-content-center align-items-center text-center mx-0 ${styles.cdnRow}`}
            key={node.id}
          >
            <div className="col">
              <div className={styles.imageBox}>
                <Image
                  src={node.thumbnail}
                  width={75}
                  height={75}
                  className={styles.image}
                />
              </div>
            </div>
            <div className="col">
              <span>{node.date}</span>
            </div>
            <div className="col">
              <span>{formatNumber(node.liked)}</span>
            </div>
            <div className="col">
              <span>{formatNumber(node.comment_count)}</span>
            </div>
            <div className="col">
              <span>{node.engagement_rate}</span>
            </div>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default CdnTable;
