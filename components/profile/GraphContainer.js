import AnalyticsGraph from "./AnalyticsGraph";
import CdnTable from "../CdnTable";
import styles from "./GraphContainer.module.css";

const GraphContainer = ({ data, graphActive }) => {
  return (
    <div className="col-12 col-md-8 d-flex text-center justify-content-right align-items-center">
      <div className={styles.graphContainer}>
        {graphActive ? (
          <AnalyticsGraph data={data} />
        ) : (
          <CdnTable data={data.nodes} />
        )}
      </div>
    </div>
  );
};

export default GraphContainer;
