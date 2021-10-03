import dynamic from "next/dynamic";

const SortDown = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.SortDown)
);

const SortUpAlt = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.SortUpAlt)
);

import TimelineSortDropdown from "../components/profile/TimelineSortDropdown";
import AnalysisButton from "../components/profile/AnalysisButton";

const activeSort = (type) => {
  switch (type) {
    case "id":
      return "Date";

    case "liked":
      return "Likes";

    case "comment_count":
      return "Comments";

    case "engagement_rate":
      return "Engagement";

    default:
      return "Date";
  }
};

const TimelineSort = ({ type, ascending, setType, setOrder }) => {
  return (
    <div className="timeline-sort d-flex justify-content-end mb-4 text-right">
      <TimelineSortDropdown
        style={{ width: "150px", marginRight: "1em" }}
        onClick={setType}
      >
        {activeSort(type)}
      </TimelineSortDropdown>
      <AnalysisButton
        active
        style={{ width: "150px" }}
        customIcon={
          ascending ? (
            <SortUpAlt style={{ fontSize: "1.5em" }} />
          ) : (
            <SortDown style={{ fontSize: "1.5em" }} />
          )
        }
        onClick={() => {
          setOrder(!ascending);
        }}
      >
        {ascending ? "Ascending" : "Descending"}
      </AnalysisButton>
    </div>
  );
};

export default TimelineSort;
