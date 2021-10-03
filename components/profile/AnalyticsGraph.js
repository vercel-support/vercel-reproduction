import { graphs } from "../../utils/graphHelper";
import styles from "./AnalyticsGraph.module.css";
import AnalysisButton from "./AnalysisButton";
import InfoButton from "./InfoButton";
import { useState } from "react";

const AnalyticsGraph = ({ data }) => {
  const [currentGraph, setcurrentGraph] = useState("dayAmount");

  const space = currentGraph.includes("Engagement");

  return (
    <>
      <div className={styles.graphBox}>
        <div className={`${styles.chartWrapper} position-relative`}>
          {graphs[currentGraph].drawGraph(data)}
        </div>
      </div>
      <div className={styles.graphTextContainer}>
        <div
          className={`${styles.changeGraphButtonContainer} ${
            !space && "justify-content-end"
          }`}
        >
          {space && <InfoButton username={data.username} />}
          <AnalysisButton
            active
            arrowDown
            dropdown="graphs"
            currentGraph={currentGraph}
            onClick={setcurrentGraph}
          >
            {graphs[currentGraph].name}
          </AnalysisButton>
        </div>
        <div className={styles.graphText}>
          {graphs[currentGraph].body(data)}
        </div>
      </div>
    </>
  );
};

export default AnalyticsGraph;
