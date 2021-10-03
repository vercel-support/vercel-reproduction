import GraphContainer from "./GraphContainer";
import ReportText from "./ReportText";
import styles from "./AnalyticsReport.module.css";

const AnalyticsReport = ({ children }) => {
  return (
    <div className={styles.analyticsReport}>
      <div className={styles.background}></div>
      <div className={`container ${styles.container}`}>
        <div className={`row w-100 ${styles.greySection}`}>{children}</div>
      </div>
    </div>
  );
};

module.exports = {
  AnalyticsReport,
  ReportText,
  GraphContainer,
};
