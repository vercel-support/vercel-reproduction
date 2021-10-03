import arrayHelper from "../../utils/arrayHelper";
import { pluralizeConcat } from "../../utils/pluralize";
import styles from "./GraphText.module.css";

function GraphText({ data, type, hidden }) {
  const {
    username,
    sortedHours,
    sortedDays,
    sortedHourEngagement,
    sortedDayEngagement,
    timeRanges,
  } = data;

  if (type === "dayAmount") {
    return (
      <div className="text-left">
        <p className={styles.date}>
          {timeRanges?.old} - {timeRanges?.new}
        </p>
        <p className={styles.text}>
          @{username} tends to publish more often on {sortedHours[0]?.prop} (
          {pluralizeConcat(sortedHours[0]?.amount, "post", "posts")}),{" "}
          {sortedHours[1]?.prop} (
          {pluralizeConcat(sortedHours[1]?.amount, "post", "posts")}) and on{" "}
          {sortedHours[2]?.prop} (
          {pluralizeConcat(sortedHours[2]?.amount, "post", "posts")}).
        </p>
      </div>
    );
  }

  if (type === "dayEngagement") {
    return (
      <>
        <div className="text-left">
          <div className={styles.date}>
            {timeRanges?.old} - {timeRanges?.new}
          </div>
          <p className={styles.text}>
            @{username} has the best engagement rate at{" "}
            {sortedHourEngagement[0]?.prop} (
            {sortedHourEngagement[0]?.amount.toFixed(2)}),{" "}
            {sortedHourEngagement[1]?.prop} (
            {sortedHourEngagement[1]?.amount.toFixed(2)}) and at{" "}
            {sortedHourEngagement[2]?.prop} (
            {sortedHourEngagement[2]?.amount.toFixed(2)}).{" "}
          </p>
        </div>
      </>
    );
  }

  if (type === "weekAmount") {
    return (
      <>
        <div className="text-left">
          <div className={styles.date}>
            {timeRanges?.old} - {timeRanges?.new}
          </div>
          <p className={styles.text}>
            @{username} is more inclined to post on {sortedDays[0]?.prop} (
            {pluralizeConcat(sortedDays[0]?.amount, "post", "posts")}
            ), {sortedDays[1]?.prop} (
            {pluralizeConcat(sortedDays[1]?.amount, "post", "posts")}) and{" "}
            {sortedDays[2]?.prop} (
            {pluralizeConcat(sortedDays[2]?.amount, "post", "posts")}
            ).
          </p>
        </div>
      </>
    );
  }

  if (type === "weekEngagement") {
    return (
      <>
        <div className="text-left">
          <div className={styles.date}>
            {timeRanges?.old} - {timeRanges?.new}
          </div>
          <p className={styles.text}>
            @{username} has the highest engagement rate on{" "}
            {sortedDayEngagement[0]?.prop}s (
            {sortedDayEngagement[0]?.amount.toFixed(2)}) and{" "}
            {sortedDayEngagement[1]?.prop}s (
            {sortedDayEngagement[1]?.amount.toFixed(2)}).{" "}
          </p>

          {!arrayHelper.getWorstValue(sortedDayEngagement) ? (
            ""
          ) : (
            <p className={styles.text}>
              {arrayHelper.getWorstValue(sortedDayEngagement).prop}s in
              comparison are the worst with (
              {arrayHelper.getWorstValue(sortedDayEngagement).amount.toFixed(2)}
              ).
            </p>
          )}
        </div>

        {/* <div className={`${styles.body} col-6`} style={{display: hidden ? "none" : "block"}}>
          { sortedDayEngagement.length > 0 && 
            <p>Die Interaktionsrate von @{username} ist am {sortedDayEngagement[0]?.prop} ({sortedDayEngagement[0]?.amount.toFixed(2)})
            am besten und {arrayHelper.getWorstValue(sortedDayEngagement).prop}s ({arrayHelper.getWorstValue(sortedDayEngagement).amount.toFixed(2)}) am schlechtesten.</p> 
          } 
            
        </div> */}
        {/* <div className="col-auto">
          <ul className="list-unstyled">
            { sortedDayEngagement.map((day, key) => (
              day.amount.toFixed(2) > 0 &&
              <li className="mb-1" key={key}>{day.prop}: {day.amount.toFixed(2)}</li>
            ))}
          </ul> 
        </div> */}
      </>
    );
  }
}

export default GraphText;
