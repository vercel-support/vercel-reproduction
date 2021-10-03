import dynamic from "next/dynamic";

import SearchResults from "../../components/SearchResults";
import HashtagResults from "../../components/search/HashtagResults";
import LocationResults from "../../components/search/LocationResults";
import SearchBox from "../../components/SearchBox";
import HashtagBox from "../../components/search/HashtagBox";
import LocationBox from "../../components/search/LocationBox";

const Geo = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Geo)
);

const modeHelper = {
  profile: {
    identifier: "@",
    placeholder: "Username",
    searchResults: ({ users }) => <SearchResults users={users} />,
    searchBox: ({ userData }) => <SearchBox users={userData} />,
  },
  hashtag: {
    identifier: "#",
    placeholder: "Hashtag",
    searchResults: ({ hashtags }) => <HashtagResults hashtags={hashtags} />,
    searchBox: ({ hashtagData }) => <HashtagBox hashtags={hashtagData} />,
  },
  location: {
    identifier: <Geo />,
    placeholder: "Location",
    searchResults: ({ locations }) => <LocationResults locations={locations} />,
    searchBox: ({ locationData, locationPage }) => (
      <LocationBox locations={locationData} locationPage={locationPage} />
    ),
  },
};

module.exports = { modeHelper };
