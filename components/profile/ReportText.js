import dynamic from "next/dynamic";

const Circle = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Circle)
);

const X = dynamic(() => import("react-bootstrap-icons").then((icon) => icon.X));

import AnalysisButton from "./AnalysisButton";
import styles from "./ReportText.module.css";
import { useState } from "react";

const ReportText = ({
  username,
  node_amount,
  timeRanges,
  isMobile,
  showGraphSection,
  setShowGraphSection,
  setGraphActive,
}) => {
  const options = { year: "numeric", month: "short", day: "numeric" };

  const [selected, setSelected] = useState("graph");

  return (
    <div className="col-12 col-md-4 p-0">
      <div id={styles.textContainer}>
        <span id={styles.reportTitle}>Analytics Report</span>
        <p id={styles.generatedAt}>
          generated on {new Date().toLocaleString("en-US", options)}
        </p>

        <p>
          View @{username} in-depth data on the latest {node_amount} posts from{" "}
          {timeRanges.new} to {timeRanges.old}
        </p>

        <AnalysisButton
          active={showGraphSection && selected === "graph"}
          style={{ marginBottom: "1.2em", fontSize: "" }}
          mobileCustomOnly={isMobile}
          customIcon={
            showGraphSection && selected === "graph" ? (
              <X
                style={{
                  fontSize: "1.5em",
                  right: "0.3em",
                  position: "absolute",
                  color: "#982027",
                }}
              />
            ) : (
              <Circle
                style={{
                  right: "0.7em",
                  position: "absolute",
                  color: "#538980",
                }}
              />
            )
          }
          arrowDown={isMobile}
          onClick={() => {
            setSelected("graph");
            setGraphActive(true);
            isMobile && showGraphSection && selected === "graph"
              ? setShowGraphSection(false)
              : setShowGraphSection(true);
          }}
        >
          Analytics Report
        </AnalysisButton>

        <AnalysisButton
          active={showGraphSection && selected === "history"}
          mobileCustomOnly={isMobile}
          customIcon={
            showGraphSection && selected === "history" ? (
              <X
                style={{
                  fontSize: "1.5em",
                  right: "0.3em",
                  position: "absolute",
                  color: "#982027",
                }}
              />
            ) : (
              <Circle
                style={{
                  right: "0.7em",
                  position: "absolute",
                  color: "#538980",
                }}
              />
            )
          }
          arrowDown={isMobile}
          onClick={() => {
            setSelected("history");
            setGraphActive(false);
            isMobile && showGraphSection && selected === "history"
              ? setShowGraphSection(false)
              : setShowGraphSection(true);
          }}
        >
          Post History
        </AnalysisButton>
      </div>
    </div>
  );
};

export default ReportText;
