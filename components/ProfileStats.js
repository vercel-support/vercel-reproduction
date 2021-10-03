import { formatArray } from "../utils/analytics";
import arrayHelper from "../utils/arrayHelper";
import EngagementCards from "./EngagementCards";
import { useState, useEffect } from "react";

import {
  AnalyticsReport,
  GraphContainer,
  ReportText,
} from "../components/profile/AnalyticsReport";

const calculateEngagement = (likes, comments, follower) =>
  Math.round(((likes + comments) / follower) * 100 * 1e2) / 1e2;

const calculateAnalysisData = (array) =>
  array.map((node) =>
    node.length > 0 ? node.reduce((a, b) => a + b) / array.length : 0
  );

const ProfileStats = ({ data }) => {
  const {
    username,
    follower,
    total_likes: likes,
    total_comments: comments,
    nodes = [],
    timeRanges,
    days = [],
    hours = [],
    locations = [],
    tags = [],
    hashtags = [],
  } = data;

  if (nodes.length == 0)
    return (
      <div className="container text-center" style={{ marginTop: "10%" }}>
        <h5>Profile has no published posts</h5>
      </div>
    );

  const node_amount = nodes.length;
  const avg_likes = likes / node_amount;
  const avg_comments = comments / node_amount;

  const engagementRate = calculateEngagement(avg_likes, avg_comments, follower);
  // const { engagementZone, followerZone } = analysis(follower);

  // Instantiate engagement - hour analysis array
  const hourArray = new Array(24);
  const dayArray = new Array(7);

  for (let i = 0; i < hourArray.length; i++) hourArray[i] = [];
  for (let i = 0; i < dayArray.length; i++) dayArray[i] = [];

  nodes.length > 0 &&
    nodes.forEach((node) => {
      hourArray[node.hour].push(node.engagement_rate);
      dayArray[node.day].push(node.engagement_rate);
    });

  const dayEngagementAnalysis = calculateAnalysisData(dayArray);
  const hourEngagementAnalysis = calculateAnalysisData(hourArray);

  const sortedDays = formatArray(days, "day", "amount");
  const sortedHours = formatArray(hours, "hour", "amount");
  const sortedDayEngagement = formatArray(
    dayEngagementAnalysis,
    "day",
    "amount"
  );
  const sortedHourEngagement = formatArray(
    hourEngagementAnalysis,
    "hour",
    "amount"
  );

  const zeroDays = arrayHelper.getZeroValues(sortedDays);
  const zeroHours = arrayHelper.getZeroValues(sortedHours);

  const [showGraphSection, setShowGraphSection] = useState(true);
  const [graphActive, setGraphActive] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 500;
    setIsMobile(isMobile);
    setShowGraphSection(!isMobile);
  }, []);

  return (
    <>
      <EngagementCards
        data={{
          node_amount,
          engagementRate,
          likes,
          comments,
          avg_likes,
          avg_comments,
        }}
      />

      <AnalyticsReport>
        <ReportText
          username={username}
          node_amount={node_amount}
          timeRanges={timeRanges}
          showGraphSection={showGraphSection}
          setShowGraphSection={setShowGraphSection}
          setGraphActive={setGraphActive}
          isMobile={isMobile}
        />

        {showGraphSection && (
          <GraphContainer
            data={{
              username,
              hours,
              days,
              node_amount,
              sortedHours,
              sortedDays,
              zeroHours,
              zeroDays,
              sortedHourEngagement,
              sortedDayEngagement,
              hourEngagementAnalysis,
              dayEngagementAnalysis,
              timeRanges,
              locations,
              tags,
              hashtags,
              nodes,
            }}
            graphActive={graphActive}
          />
        )}
      </AnalyticsReport>
    </>
  );
};

export default ProfileStats;
