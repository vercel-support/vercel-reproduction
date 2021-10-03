//import DarkDayAmount from "../components/charts/DarkDayAmount";
//import DarkWeekAmount from "../components/charts/DarkWeekAmount";
//import DarkDayEngagement from "../components/charts/DarkDayEngagement";
//import DarkWeekEngagement from "../components/charts/DarkWeekEngagement";
//import GraphText from "../components/charts/GraphText";
//import Tags from "../components/Tags";

import dynamic from "next/dynamic";

const DarkDayAmount = dynamic(() =>
  import("../components/charts/DarkDayAmount")
);
const DarkWeekAmount = dynamic(() =>
  import("../components/charts/DarkWeekAmount")
);
const DarkDayEngagement = dynamic(() =>
  import("../components/charts/DarkDayEngagement")
);
const DarkWeekEngagement = dynamic(() =>
  import("../components/charts/DarkWeekEngagement")
);
const GraphText = dynamic(() => import("../components/charts/GraphText"));
const Tags = dynamic(() => import("../components/Tags"));

const dayAmount = {
  name: "Posts (Day)",
  title: ({ username }) =>
    `Post analysis per day - @${username} publishes the most at these times.`,
  //`Tagesanalyse der Beiträge - Zu diesen Uhrzeiten veröffentlicht @${username} am meisten.`,
  drawGraph: ({ hours }) => <DarkDayAmount hours={hours} />,
  body: (data) => <GraphText data={data} type="dayAmount" />,
};

const weekAmount = {
  name: "Posts (Week)",
  title: ({ username }) =>
    `Wochenanalyse der Beiträge - @${username} veröffentlicht seine Beitrage an diesen Tagen.`,
  drawGraph: ({ days }) => <DarkWeekAmount days={days} />,
  body: (data) => <GraphText data={data} type="weekAmount" />,
};

const dayEngagement = {
  name: "Engagment (Day)",
  title: ({ username }) =>
    `Tagesanalyse der Interaktionsrate - @${username} hat die meisten Interaktionen zu den folgenden Zeiten.`,
  drawGraph: ({ hourEngagementAnalysis }) => (
    <DarkDayEngagement hourEngagementAnalysis={hourEngagementAnalysis} />
  ),
  body: (data) => <GraphText data={data} type="dayEngagement" />,
};

const weekEngagement = {
  name: "Engagement (Week)",
  title: ({ username }) =>
    `Wochenanalyse der Interaktionsrate - An diesen Tagen erzielen @${username}'s Beitrage die meisten Interaktionen.`,
  drawGraph: ({ dayEngagementAnalysis }) => (
    <DarkWeekEngagement dayEngagementAnalysis={dayEngagementAnalysis} />
  ),
  body: (data) => <GraphText data={data} type="weekEngagement" />,
};

const custom = {
  title: ({ username }) =>
    `Baue deinen eigenen Graphen mit all den Infos von @${username} die du analysieren möchstest!`,
  drawGraph: ({ data, type }) => <CustomGraph data={data} type={type} />,
  body: () => <></>,
};

const locations = {
  name: "Makierte Orte",
  drawGraph: ({ username, locations, currentGraph }) => {
    return (
      <Tags
        tagHeader="Markierte Orte"
        tagCaption={`Meist markierte Orte von @${username}`}
        tags={locations}
        type="location"
        hidden={currentGraph != "locations"}
      />
    );
  },
};

const tags = {
  name: "Getaggte Profile",
  drawGraph: ({ username, tags, currentGraph }) => {
    return (
      <Tags
        tagHeader="Getaggte Profile"
        tagCaption={`Getaggte Profile und Accounts von @${username}`}
        tags={tags}
        type="tags"
        hidden={currentGraph != "tags"}
      />
    );
  },
};

const hashtags = {
  name: "Hashtags",
  drawGraph: ({ username, hashtags, currentGraph }) => (
    <Tags
      tagHeader="Benutzte Hashtags"
      tagCaption={`Meist benutzte Hashtags von @${username}`}
      tags={hashtags}
      type="hashtags"
      hidden={currentGraph != "hashtags"}
    />
  ),
};

const graphs = {
  dayAmount,
  dayEngagement,
  weekAmount,
  weekEngagement,
  custom,
  locations,
  tags,
  hashtags,
};

module.exports = { graphs };
