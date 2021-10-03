import dynamic from "next/dynamic";

const ClockHistory = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ClockHistory)
);

const ClipboardData = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ClipboardData)
);

import Dropdown from "react-bootstrap/Dropdown";
import styles from "./GraphSection.module.css";
import GraphText from "./charts/GraphText";
import CdnTable from "./CdnTable";
import { graphs } from "../utils/graphHelper";
import { useState } from "react";

function GraphSection({ data, showGraphSection }) {
  const { locations = [], hashtags = [], tags = [] } = data;
  const [currentGraph, setcurrentGraph] = useState("dayAmount");
  const [timelineVisible, setTimelineVisible] = useState(false);

  data.currentGraph = currentGraph;

  return (
    <div
      className="container my-5 px-0"
      style={{ display: showGraphSection ? "block" : "none" }}
    >
      <div
        className={`row justify-content-between align-items-center mb-3 mt-5 ${styles.buttonRow}`}
      >
        <div
          className={`${styles.graphTitleBox} col-xs-6 col-lg-4 align-items-center d-flex`}
          id={styles[currentGraph]}
          style={{ visibility: timelineVisible ? "hidden" : "visible" }}
        >
          <Dropdown className="d-inline-flex">
            <Dropdown.Toggle variant="outline" className={`${styles.dropdown}`}>
              {graphs[currentGraph].name}
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-0">
              <Dropdown.Item
                className={`btn py-1 ${styles.drowdown}`}
                onClick={() => setcurrentGraph("dayAmount")}
              >
                Posts (Day)
              </Dropdown.Item>
              <Dropdown.Item
                className={`btn py-1 ${styles.drowdown}`}
                onClick={() => setcurrentGraph("dayEngagement")}
              >
                Engagement (Day)
              </Dropdown.Item>
              <Dropdown.Item
                className={`btn py-1 ${styles.drowdown}`}
                onClick={() => setcurrentGraph("weekAmount")}
              >
                Posts (Week)
              </Dropdown.Item>
              <Dropdown.Item
                className={`btn py-1 ${styles.drowdown}`}
                onClick={() => setcurrentGraph("weekEngagement")}
              >
                Engagement (Week)
              </Dropdown.Item>

              {locations.length > 0 && (
                <Dropdown.Item
                  className={`btn py-1 ${styles.drowdown}`}
                  onClick={() => setcurrentGraph("locations")}
                >
                  Tagged Locations
                </Dropdown.Item>
              )}
              {tags.length > 0 && (
                <Dropdown.Item
                  className={`btn py-1 ${styles.drowdown}`}
                  onClick={() => setcurrentGraph("tags")}
                >
                  Tagged Profiles
                </Dropdown.Item>
              )}
              {hashtags.length > 0 && (
                <Dropdown.Item
                  className={`btn py-1 ${styles.drowdown}`}
                  onClick={() => setcurrentGraph("hashtags")}
                >
                  Tagged Hashtags
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          className={`col-auto ${styles.postHistory}`}
          onClick={() => setTimelineVisible(!timelineVisible)}
        >
          {timelineVisible ? (
            <>
              <button className={`btn btn-outline ${styles.switchAnalysis}`}>
                Graphanalysis
              </button>
              <ClipboardData
                className={`mr-1 ${styles.svg}`}
                fontSize="1.5em"
                color="white"
              />
            </>
          ) : (
            <>
              <button className={`btn btn-outline ${styles.switchAnalysis}`}>
                Post history
              </button>
              <ClockHistory
                className={`mr-1 ${styles.svg}`}
                fontSize="1.5em"
                color="white"
              />
            </>
          )}
        </div>
      </div>

      <CdnTable cdnData={data.nodes} timelineVisible={timelineVisible} />

      <div
        className={`${styles.graphBox}`}
        style={{ display: timelineVisible ? "none" : "block" }}
      >
        <div className={`${styles.chartWrapper} position-relative`}>
          {graphs[currentGraph].drawGraph(data)}
        </div>
      </div>

      {/* <div className="row justify-content-center my-5">
        <GraphSelection selectGraph={type => setcurrentGraph(type)} />
      </div> */}

      <div
        className={`row justify-content-center my-5 ${styles.graphTextContainer}`}
      >
        {/* {graphs[currentGraph].body(data)} */}
        <GraphText
          data={data}
          type="dayAmount"
          hidden={currentGraph != "dayAmount" || timelineVisible}
        />
        <GraphText
          data={data}
          type="dayEngagement"
          hidden={currentGraph != "dayEngagement" || timelineVisible}
        />
        <GraphText
          data={data}
          type="weekAmount"
          hidden={currentGraph != "weekAmount" || timelineVisible}
        />
        <GraphText
          data={data}
          type="weekEngagement"
          hidden={currentGraph != "weekEngagement" || timelineVisible}
        />
      </div>
      {/* <div className="row mb-5 tag-analysis">
        <TagSection username={} />
      </div> */}
    </div>
  );
}

export default GraphSection;
